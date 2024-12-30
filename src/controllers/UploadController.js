import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import axios from 'axios';
import { catchAsync } from '@/utils/catchAsync';
import { successResponse } from '@/utils/response';
import { UPLOAD_SECRET } from '@/config/env';
import { getExtname, getFileName, getSize, giveCurrentDateTime } from '@/utils';
import UploadModel from '@/models/UploadModel';

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

export const UploadController = {
  upload: catchAsync(async (req, res) => {
    if (!req.file) throw new Error('File Upload Required!');

    if (req.headers['x-upload-secret'] !== UPLOAD_SECRET) throw new Error('Something wrong!');

    const dateTime = giveCurrentDateTime();
    const fileName = `${getFileName(req.file.originalname)}__${dateTime}`;

    const storageRef = ref(storage, `files/${`${fileName}`}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    const data = {
      name: fileName,
      extName: getExtname(req.file.originalname),
      mimetype: req.file.mimetype,
      downloadURL,
      size: getSize(req.file.size),
      created_at: Date.now(),
    };

    const uploadData = await UploadModel.store(data);

    return res.json(successResponse('File uploaded to firebase storage!', { ...uploadData }));
  }),

  show: catchAsync(async (req, res) => {
    const result = await UploadModel.findById(req.params.id);

    if (!result) throw new Error('File not found!');

    return res.json(successResponse('Get file!', result));
  }),

  displayFile: catchAsync(async (req, res) => {
    const result = await UploadModel.findById(req.params.id);

    if (!result) throw new Error('File not found!');

    const response = await axios({
      url: result.downloadURL,
      method: 'GET',
      responseType: 'stream',
    });

    res.setHeader(`Content-Disposition`, `attachment; filename="${result.name}"`);
    res.setHeader('Content-Type', result.mimetype);

    return response.data.pipe(res);
  }),

  list: catchAsync(async (req, res) => {
    const result = await UploadModel.list(req.query);

    return res.json(successResponse('List file!', result));
  }),

  destroy: catchAsync(async (req, res) => {
    const result = await UploadModel.destroy(req.params.id);
    if (result) {
      const desertRef = ref(storage, `files/${result.name}`);
      deleteObject(desertRef);
    }

    return res.json(successResponse('Remove file!'));
  }),
};
