import { Router } from 'express';
import {
  getFileMiddleware,
  postFileMiddleware,
  updateFileMiddleware,
  deleteFileMiddleware
} from '../middlewares/file.middleware';
import {
  getFileController,
  getAllFileController,
  postFileController,
  putFileController,
  patchFileController,
  deleteFileController
} from '../controllers/file.controller';

export const fileRouter = () => {
  const router = Router();

  router.get('/all', getAllFileController);
  router.get('/byId/:id', getFileMiddleware, getFileController);
  router.post('/', postFileMiddleware, postFileController);
  router.patch('/:id', updateFileMiddleware, patchFileController);
  router.put('/:id', updateFileMiddleware, putFileController);
  router.delete('/:id', deleteFileMiddleware, deleteFileController);

  return router;
}
