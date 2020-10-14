require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { FIELDS } from './utils/constants/constant';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({}));
  app.use(passport.initialize());
  const options = new DocumentBuilder()
    .setTitle('Grocery Management')
    .setDescription('To Manage Grocery Products')
    .addBearerAuth(`${FIELDS.AUTH_HEADER_KEY}`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.enableCors();
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
