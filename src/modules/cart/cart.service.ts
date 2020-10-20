import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('cart') private readonly cartModel: Model,
    private productService: ProductService,
  ) {}

  async getAllCartItems(userid): Promise<[]> {
    const result = await this.cartModel
      .find({ userId: userid, isActive: true })
      .populate({ path: 'productId', select: 'productImage name size color ' })
      .exec();
    console.log(result);
    return result;
  }

  async addProductToCart(payload): Promise<any> {
    const result = await this.cartModel.create({ ...payload });
    return {
      status: HttpStatus.CREATED,
      message: 'Product added to cart successfully..',
    };
  }

  async incrementProductQuantity(payload): Promise<any> {
    const result = await this.cartModel
      .findOneAndUpdate(
        {
          userId: payload.userId,
          productId: payload.productId,
        },
        { quantity: payload.quantity },
        { new: true },
      )
      .exec();
    return {
      status: HttpStatus.OK,
      message: 'Product quantity incremented successfully..',
      ...result._doc
    };
  }

  async deleteProduct(payload): Promise<any> {
    const result = await this.cartModel
      .findOneAndUpdate(
        {
          userId: payload.userId,
          productId: payload.productId,
        },
        { isActive: false },
        { new: true },
      )
      .exec();
    return {
      status: HttpStatus.OK,
      message: 'Product deleted from cart successfully..'
    };
  }
}
