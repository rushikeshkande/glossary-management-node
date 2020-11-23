/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  Param,
  Put,
  Delete,
  Query
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CartService } from './cart.service';
import { AddToCartDTO } from './cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly CartService: CartService) {}

  @Get(':id/all')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get all cart items' })
  async getCartItems(@Param('id') id, @Res() res: Response): Promise<any> {
    const cartDetails = await this.CartService.getAllCartItems(id);
    res.json(cartDetails);
  }

  @Post('/add')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'add product to cart' })
  async addToCart(@Body() body: AddToCartDTO): Promise<any> {
    try {
      const result = await this.CartService.addProductToCart(body);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Delete('/delete')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'delete product from cart' })
  async deleteProduct(@Query() params,@Res() res: Response): Promise<any> {
    try {
      const result = await this.CartService.deleteProduct(params.userId,params.productId);
      return res.json(result);
    } catch (err) {
      throw err;
    }
  }
}
