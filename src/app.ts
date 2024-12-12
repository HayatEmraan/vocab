import notFound from '@app/routes/notFound';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import router from '@app/routes/routes';
import cookieParser from 'cookie-parser';
import errorHandler from '@app/middlewares/errorHandler';

const app: Application = express();

// middlewares
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(morgan('dev'));
app.disable('x-powered-by');

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: 'server is running',
    data: null,
  });
});

// routes dir
app.use('/api/v1', router);

// not found route
app.use('*', notFound);

// error handler
app.use(errorHandler);

export default app;
