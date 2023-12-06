import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

let server: Server;
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);

    logger.info('Database connected');
    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(error);
  }
  process.on('unhandledRejection', error => {
    errorLogger.error(
      'Unhandled rejection is detected, we are closing our server.......!',
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', error => {
  if (server) {
    errorLogger.error(error);
    server.close();
  }
});
