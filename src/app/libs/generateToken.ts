import appError from '@app/errors/appError';
import { encryptTypes } from '@app/types/encrypt.types';
import { env } from '@config/index';
import crypto from 'crypto';
import httpStatus from 'http-status';

const secretKey = env.SECRET as string;
const algorithm = env.ALGO as string;
const ivInitial = crypto.randomBytes(16);

function createEncryptedToken(data: encryptTypes) {
  try {
    const expirationTime = Date.now() + 3600000;
    const tokenData = { ...data, exp: expirationTime };

    const dataString = JSON.stringify(tokenData);
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(secretKey, 'utf-8'),
      ivInitial
    );
    let encrypted = cipher.update(dataString, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: ivInitial.toString('hex'), encryptedToken: encrypted };
  } catch (error) {
    console.error('Error encrypting token:', error);
    throw new appError(
      'Failed to encrypt token',
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export default createEncryptedToken;
