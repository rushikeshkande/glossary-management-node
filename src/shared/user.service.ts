import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../modules/auth/auth.dto';
import { Payload } from '../modules/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model) {}

  async create(userDTO: RegisterDTO) {
    const { email } = userDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
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
}
