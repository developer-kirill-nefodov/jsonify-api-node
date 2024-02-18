import { NextFunction, Request, Response } from 'express';

import { ErrorMessages } from '../constants/messages';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = ErrorMessages.ERROR_SERVER;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  logger.emit('error', message);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};