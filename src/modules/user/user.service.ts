import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync, compareSync } from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { awsupload } from 'src/utils/fileUpload';
import { S3 } from 'aws-sdk';
import { FIELDS } from 'src/utils/constants/constant';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model) {}

  async create(payload): Promise<any> {
    const existingUser = await this.userModel.findOne({
      email: payload.email,
    });
    if (existingUser) {
      return false;
    }
    payload.password = hashSync(payload.password, 10);
    const user = await this.userModel.create({ ...payload });
    user.password = null;
    return user;
  }

  async updateData(payload): Promise<any> {
    const data = await this.userModel.findOneAndUpdate(
      { userid: payload.userid },
      payload,
      { useFindAndModify: false },
    );
    return data;
  }

  async getUsers(): Promise<[]> {
    return await this.userModel.find().exec();
  }

  async login(payload): Promise<any> {
    try {
      const existUser = await this.userModel.findOne({
        username: payload.username,
      });
      if (existUser) {
        if (compareSync(payload.password, existUser.password)) {
          const payloadfortoken = { username: payload.username };
          const token = jsonwebtoken.sign(
            payloadfortoken,
            process.env.JWT_SECRETE_TOKEN,
          );
          return {
            userData: existUser,
            [FIELDS.AUTH_HEADER_KEY]: token,
            status: HttpStatus.OK,
          };
        } else {
          throw new HttpException(
            'Wrong credentials provided',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        throw new HttpException(
          'User with this email does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id): Promise<any> {
    const user = await this.userModel.findOneAndDelete(
      { userid: id },
      { useFindAndModify: false },
    );
    return user;
  }

  async upload(file) {
    const { originalname } = file;
    const bucketS3 = "backend-practice-123";
    const s3 = new S3({
      accessKeyId: "AKIAWWV3XBVBOOQKJ4F7",
      secretAccessKey: "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",
      region: "ap-south-1"
    });
    const params = {
      Bucket: bucketS3,
      Key: String(originalname),
      Body: file.buffer,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
}
