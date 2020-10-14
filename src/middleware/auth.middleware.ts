import * as jsonwebtoken from 'jsonwebtoken';
import { NestMiddleware, HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { FIELDS } from 'src/utils/constants/constant';
import { ERROR_MESSAGE } from '../utils/constants/errorMessages';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers[FIELDS.AUTH_HEADER_KEY]) {
      try {
        const decoded = jsonwebtoken.verify(
          req.headers.authorization,
          process.env.JWT_SECRETE_TOKEN,
        );
        console.log("decoded",decoded);
        if (decoded) {
          next();
          return;
        } else {
        throw new HttpException(
          ERROR_MESSAGE.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
        );
        }
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.log('**Token Error', error);
        throw new HttpException(
          ERROR_MESSAGE.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    throw new HttpException(
      ERROR_MESSAGE.UNAUTHORIZED,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
