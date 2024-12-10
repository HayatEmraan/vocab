import { encryptTypes } from './encrypt.types';

declare global {
  namespace Express {
    interface Request {
      user: encryptTypes;
    }
  }
}
