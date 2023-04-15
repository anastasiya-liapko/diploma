import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
    .setTitle('ONLINE STORE OF BUILDING MATERIALS')
    .setDescription('API')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(json({ limit: '32mb' }));
  app.use(urlencoded({ limit: '32mb' }));

  await app.listen(8085);
}
bootstrap();
