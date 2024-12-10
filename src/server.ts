import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { errorLogger, logger } from '@app/libs/logger';
import { env } from './config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(env.DATABASE_URL as string);
    logger.info('connected to database');

    server = app.listen(env.PORT, () => {
      logger.info(`app is listening on port ${env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    errorLogger.error(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  errorLogger.error(err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  errorLogger.error('uncaughtException is detected');
  process.exit(1);
});
