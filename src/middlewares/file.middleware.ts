import { Request, Response, NextFunction } from 'express';

import { MiddlewareMessages } from '../constants/messages';
import { ApiError } from '../utils/api-error';

export interface FileData<T> {
  [key: string]: T;
}

export const getFileMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    next(new ApiError(400, MiddlewareMessages.FILE_ID_REQUIRED));
  }

  next();
};

export const postFileMiddleware = async <T>(req: Request, res: Response, next: NextFunction) => {
  const data: FileData<T> = req.body;

  if (!Object.keys(data).length) {
    next(new ApiError(400, MiddlewareMessages.DATA_REQUIRED_FOR_CREATION));
  }

  next();
};

export const updateFileMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data = req.body;

  if (!id || !Object.keys(data).length) {
    next(new ApiError(400, MiddlewareMessages.FILE_ID_AND_DATA_REQUIRED));
  }

  next();
};

export const deleteFileMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) {
    next(new ApiError(400, MiddlewareMessages.FILE_ID_REQUIRED));
  }

  next();
};