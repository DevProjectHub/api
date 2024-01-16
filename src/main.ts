import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { NullableTransformInterceptor } from './shared/interceptor/nullable.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['log', 'error', 'warn'],
  });

  app.enableCors();

  app.use(
    json({ limit: '50mb' }),
    urlencoded({ limit: '50mb', extended: true }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalInterceptors(new NullableTransformInterceptor());

  await app.listen(3000);
}

bootstrap();
