import { v4 as uuid } from 'uuid';
import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../utils/api-error';
import { ResponseMessages } from '../constants/messages';
import {
  readFileRepository,
  getAllFilesNamesRepository,
  writeFileRepository,
  deleteFileRepository
} from '../repositories/file.repository';

export const getFileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileData = await readFileRepository(req.params.id);
    res.status(200).json(fileData);
  } catch (e) {
    const errorMessage = e instanceof ApiError ? e.message : String(e);
    next(new ApiError(400, errorMessage));
  }
}

export const getAllFileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filesNames = await getAllFilesNamesRepository()
    res.status(200).json(filesNames || []);
  } catch (e) {
    next(e);
  }
}
export const postFileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = uuid();
    await writeFileRepository(req.body, id);
    res.status(200).json({ id, message: ResponseMessages.SUCCESSFUL_CREATE });
  } catch (e) {
    next(e);
  }
}

export const patchFileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body, id = req.params.id;

    const keys = Object.keys(data);
    const fileData = await readFileRepository(id);

    keys.forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fileData as any)[key] = data[key];
    });

    await writeFileRepository(fileData, id);

    res.status(200).json({ message: ResponseMessages.SUCCESSFUL_UPDATE });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const putFileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body, id = req.params.id;

    await writeFileRepository(data, id);

    res.status(200).json({ message: ResponseMessages.SUCCESSFUL_UPDATE });
  } catch (e) {
    next(e);
  }
}
export const deleteFileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    await deleteFileRepository(id);

    res.status(200).json({ message: ResponseMessages.SUCCESSFUL_DELETE });
  } catch (e) {
    next(e);
  }
}
