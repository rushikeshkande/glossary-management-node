require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import 'dotenv/config';
import * as Express from 'express';
import * as cors from 'cors';
import { ExpressAdapter } from '@nestjs/platform-express';


const server = Express();
server.use(cors());
server.get('/', (req, res) => res.send('ok'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
