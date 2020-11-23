import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      .exec();
    return result;
  }

  async addProductToCart(payload: any): Promise<any> {
    const { userId, productId } = payload;
    const cartItem = await this.cartModel.findOne({
      userId: userId,
      productId: productId,
      isActive: true,
    });
    if (cartItem) {
      throw new HttpException(
        'this product already exists in your cart',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const result = await this.cartModel.create({
        ...payload,
      });
      return {
        status: HttpStatus.CREATED,
        message: 'Product added to cart successfully..',
        ...result,
      };
    }
  }

  async deleteProduct(userId, productId): Promise<any> {
    const result = await this.cartModel
      .findOneAndUpdate(
        {
          userId: userId,
          productId: productId,
        },
        { isActive: false },
        { new: true },
      )
      .exec();
    return {
      status: HttpStatus.OK,
      message: 'Product deleted from cart successfully..',
      ...result,
    };
  }
}
