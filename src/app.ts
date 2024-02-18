import 'dotenv/config';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import { routers } from './routers';
import { logger } from './utils/logger';
import { LoggerMessages } from './constants/messages';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

const createServer = async (): Promise<void> => {
  const app: Express = express();
  const port = process.env.PORT || 4000;
  const swaggerDocument = yaml.load('api-swagger.yml');

  swaggerDocument.servers = [
    { url: `http://localhost:${port}/api`, description: 'Local server' },
  ];

  app.use(express.json());

  app.use('/api', routers());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.all('*', notFoundMiddleware);
  app.use(errorMiddleware);

  app.listen(port, () => logger.emit('success', `http://localhost:${port}`));
}

createServer()
  .then(() => logger.emit('info', LoggerMessages.SERVER_WORKING))
  .catch(() => logger.emit('error', LoggerMessages.SERVER_ERROR));