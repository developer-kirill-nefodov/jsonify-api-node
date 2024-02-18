import fs from 'fs/promises';

import { ApiError } from '../utils/api-error';
import { ErrorMessages } from '../constants/messages';

export const readFile = async <T>(filePath: string): Promise<T> => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data) as T;
  } catch {
    throw new ApiError(400, ErrorMessages.ERROR_READING_FILE);
  }
}

export const writeFile = async <T>(filePath: string, data: T): Promise<void> => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, 'utf8');
  } catch {
    throw new ApiError(400, ErrorMessages.ERROR_WRITING_FILE);
  }
}

export const getFilesNames = async (directoryName: string): Promise<string[] | undefined> => {
  try {
    return await fs.readdir(directoryName);
  } catch {
    throw new ApiError(400, ErrorMessages.ERROR_READING_DIRECTORY);
  }
}

export const deleteFile = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch {
    throw new ApiError(400, ErrorMessages.ERROR_DELETING_FILE);
  }
}