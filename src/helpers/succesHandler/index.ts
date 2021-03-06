import { Response, NextFunction } from 'express';

export const handleSuccess = (statusCode: number, message: string, res: Response, next: NextFunction, data: any) => {
  res.status(statusCode).send({
    status:'success',
    message,
    data: data ? data : null
  });
};
