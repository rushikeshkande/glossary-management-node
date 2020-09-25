import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync, compareSync } from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model) {}

  async create(payload): Promise<any> {
    payload.password = hashSync(payload.password, 10);
    const user = await this.userModel.create({ ...payload });
    return user;
  }

  async updateData(payload): Promise<any> {
    const data = await this.userModel.findOneAndUpdate({ userid: payload.userid}, payload, { useFindAndModify : false});
    return data;
  }

  async getUsers(): Promise<[]> {
    return await this.userModel.find().exec();
  }

  async login(payload): Promise<any> {
    try {
        console.log(">>>>>payload",payload);
      const existUser = await this.userModel.findOne({
        username: payload.username,
      });
      console.log(existUser);
      if (existUser) {
        if (
          compareSync(payload.password, existUser.password)
        ) {
            const payloadfortoken = {username: payload.username}
            const token = jsonwebtoken.sign(payloadfortoken, 'Shh5QDtcBmymJFJUKVUy2y02');
          return { message: 'you have successfully logged in!', authorizationToken: token };
        } else {
          return { message: 'you have entered wrong password!' };
        }
      } else {
          return { message: 'you are not registered with us!'};
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id): Promise<any> {
    const user = await this.userModel.findOneAndDelete({ userid: id}, { useFindAndModify : false});
    return user;
  }
}
