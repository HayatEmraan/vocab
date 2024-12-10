import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "route isn't found",
    error: {
      path: req.originalUrl,
    },
  });
};

export default notFound;
