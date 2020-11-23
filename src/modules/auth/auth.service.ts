import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../../shared/user.service';
import { Payload } from '../auth/auth.dto';
import { S3 } from 'aws-sdk';
import { Logger } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.JWT_SECRETE_TOKEN, { expiresIn: '12h' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }

  async uploadProfileImage(file: any): Promise<any> {
    const { originalname } = file;
    const bucketS3 = process.env.AWS_S3_BUCKET_NAME;
    const s3 = new S3({
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_REGION,
    });
    const params = {
      Body: file.buffer,
      Bucket: bucketS3,
      Key: String(originalname),
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
}
