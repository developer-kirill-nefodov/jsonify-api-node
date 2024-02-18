import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../utils/api-error';
import { MiddlewareMessages } from '../constants/messages';

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, MiddlewareMessages.NOT_FOUND_ROUTER));
}
