import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(@InjectModel('product') private readonly productModel: Model) {}

  async getProducts(): Promise<[]> {
    return await this.productModel.find().exec();
  }

  async create(payload): Promise<[]> {
    const result = await this.productModel.create({ ...payload });
    return result;
  }

  async getProductById(id): Promise<any> {
    const result = await this.productModel.findOne({ _id: id });
    return result;
  }

  async getProductByName(name): Promise<any> {
    const regex = new RegExp(name, 'i');
    const searchResult = await this.productModel.find({
      name: { $regex: regex }
    });
    return searchResult;
  }
}
