import path from 'path';

import { deleteFile, getFilesNames, readFile, writeFile } from './';

export const readFileRepository = async <T>(id: string): Promise<T> => {
  const filePath = path.join(__dirname, '../storage/files', `${id}.json`);
  return await readFile(filePath);
}

export const writeFileRepository = async <T>(data: T, fileName: string) => {
  const filePath = path.join(__dirname, '../storage/files', `${fileName}.json`);
  await writeFile(filePath, data);
}

export const getAllFilesNamesRepository = async () => {
  const dirname = path.join(__dirname, '../storage/files');
  const filesNames = await getFilesNames(dirname);

  return filesNames?.map(name => {
    const lastIndex = name.lastIndexOf('.');
    return lastIndex > 0 ? name.substring(0, lastIndex) : name;
  });
}

export const deleteFileRepository = async (fileName: string) => {
  const filePath = path.join(__dirname, '../storage/files', `${fileName}.json`);
  await deleteFile(filePath);
}