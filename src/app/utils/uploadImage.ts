/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import { env } from '@config/index';

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_KEY,
  api_secret: env.CLOUD_SECRET,
});

export const uploadImage = async (name: string, file: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { public_id: name },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        fs.unlink(file, (err) => {
          if (err) throw err;
          console.log('file deleted');
        });
      }
    );
  });
};

export const deleteImage = (file: string) => {
  fs.unlink(file, (err) => {
    if (err) throw err;
    console.log('file deleted');
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
