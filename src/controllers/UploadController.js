import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { catchAsync } from '@/utils/catchAsync';
import { successResponse } from '@/utils/response';
import { UPLOAD_SECRET } from '@/config/env';

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

export const UploadController = {
  upload: catchAsync(async (req, res) => {
    if (!req.file) throw new Error('File Upload Required!');

    if (req.headers['x-upload-secret'] !== UPLOAD_SECRET) throw new Error('Something wrong!');

    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `files/${`${req.file.originalname}__${dateTime}`}`);

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
      message: 'File uploaded to firebase storage!',
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL,
    };

    return res.json(successResponse(data));
  }),
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
  const dateTime = `${date}-${time}`;
  return dateTime;
};
