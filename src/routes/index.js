import multer from 'multer';
import { HelloWorld, UploadController } from '@/controllers';

import { errorHandle } from '@/middlewares';

// Setting up multer as a middleware to grab photo uploads
const upload = multer({
  storage: multer.memoryStorage(),
});

const router = (app) => {
  // say hello world
  app.get('/', HelloWorld);

  app.post('/upload', upload.single('file'), UploadController.upload);

  // handle errors
  app.use(errorHandle);
};

export default router;
