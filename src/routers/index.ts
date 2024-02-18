import { Router } from 'express';

import { fileRouter } from './file.router';

export const routers = () => {
  const router = Router();

  router.use('/files', fileRouter());

  return router;
}