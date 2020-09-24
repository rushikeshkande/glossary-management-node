import * as jsonwebtoken from 'jsonwebtoken';
import {
  NestMiddleware,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers['authorization']) {
        const decoded = jsonwebtoken.verify(
          req.headers['authorization'],
          'Shh5QDtcBmymJFJUKVUy2y02',
        );
        if(decoded) {
            next();
            return;
        }
        throw new HttpException('Unauthorized User', 401);
      }
    } catch (error) {
      console.log('token error', error);
      throw new HttpException('Unauthorized User', 401);
    }
  }
}
