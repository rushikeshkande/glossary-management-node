import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartSchema } from './cart.schema';
import { CartController } from './cart.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'cart', schema: CartSchema }]),
    SharedModule,
    ProductModule
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
