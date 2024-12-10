import appError from '@app/errors/appError';
import { env } from '@config/index';
import crypto from 'crypto';
import httpStatus from 'http-status';

const secretKey = env.SECRET as string;
const algorithm = env.ALGO as string;

function decryptToken(encryptedToken: string, iv: string) {
  try {
    const ivBuffer = Buffer.from(iv, 'hex');
    const encryptedBuffer = Buffer.from(encryptedToken, 'hex');

    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(secretKey, 'utf-8'),
      ivBuffer
    );

    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    const decryptedString = decrypted.toString('utf-8');

    const data = JSON.parse(decryptedString);

    if (data.exp && Date.now() > data.exp) {
      throw new appError('Token has expired', httpStatus.UNAUTHORIZED);
    }

    return data;
  } catch (error) {
    console.error('Error decrypting token:', error);
    throw new appError('Invalid or expired token', httpStatus.UNAUTHORIZED);
  }
}

const encryptedToken = '...';
const iv = '...';

const decryptedData = decryptToken(encryptedToken, iv);
console.log('Decrypted Data:', decryptedData);

export default decryptToken;
