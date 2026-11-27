import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const port = Number(process.env.PORT ?? 3000);

  await app.listen(port);

  console.log(`API running at http://localhost:${port}`);
};

bootstrap().catch((error: unknown) => {
  console.error('Failed to start the API:', error);
  process.exitCode = 1;
});