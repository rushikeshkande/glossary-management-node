import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductSchema } from './product.schema';
import { ProductController } from './product.controller';
import { SharedModule } from 'src/shared/shared.module';
// import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }]),
    SharedModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
