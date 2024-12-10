import { uploadImage } from '@app/utils/uploadImage';
import { RequestHandler } from 'express';

const parseUser: RequestHandler = async (req, res, next) => {
  let photoURL;
  if (req.file) {
    photoURL = await uploadImage(req.file.filename, req.file.path);
  }

  req.body = JSON.parse(req.body.data);
  req.body.photoURL = photoURL?.secure_url;
  next();
};

export default parseUser;
