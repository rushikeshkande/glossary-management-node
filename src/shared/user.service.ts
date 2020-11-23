import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { awsupload } from 'src/utils/fileUpload';
import { LoginDTO, RegisterDTO } from '../modules/auth/auth.dto';
import { Payload } from '../modules/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model) {}

  async create(userDTO: RegisterDTO, file: any) {
    const { email } = userDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    if (file) {
      const fileData: any = await awsupload(file);
      userDTO['profile'] = fileData.Location;
    }
    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async find() {
    return await this.userModel.find();
  }

  async findByLogin(userDTO: LoginDTO) {
    const { email, password } = userDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  sanitizeUser(user: any) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async userForgotPassword(payload: any): Promise<any> {
    const { email, password } = payload;
    const user = await this.userModel.findOne({ email });
    if (user) {
      const hashed = await bcrypt.hash(password, 10);
      const result = await this.userModel.findOneAndUpdate(
        { email: email },
        { password: hashed },
        { new: true },
      );
      return result;
    } else {
      throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
    }
  }
}
