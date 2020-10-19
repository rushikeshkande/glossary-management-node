import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { ProductModule } from './product.module';


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

  async getProductById(id): Promise<[]> {
    const result = await this.productModel.findOne({ _id : id});
    return result;
  }
}