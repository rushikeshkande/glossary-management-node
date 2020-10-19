import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Param} from '@nestjs/common';
import { AuthGuard} from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { ProductService } from './product.service';
import { AddProduct } from './product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

  @Get('/products')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get all products' })
  async getAllProducts(@Res() res: Response): Promise<any> {
    const details = await this.productService.getProducts();
    res.json(details);
  }

  @Post()
  @ApiOperation({ title: 'add product' })
  async addProduct(@Res() res: Response, @Body() payload: AddProduct): Promise<any> {
    const result = await this.productService.create(payload);
    res.status(200).json(result);
  }

  @Get(':id/getDetails')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'get product details by id' })
  async getProductDetails(@Param('id') id, @Res() res: Response): Promise<any> {
    const details = await this.productService.getProductById(id);
    res.json(details);
  }
}
