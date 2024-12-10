import { encryptTypes } from './encrypt.types';

declare global {
  namespace Express {
    export interface Request {
      user: encryptTypes;
    }
  }
}
