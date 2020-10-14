import { Module, MiddlewareConsumer, RequestMethod, Get } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductSchema } from './product.schema';
import { ProductController } from './product.controller';
// import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { AuthMiddleware } from '../../middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes(StudentController);
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/product', method: RequestMethod.GET},
        {path:'/product', method: RequestMethod.POST}
      )
      .forRoutes(ProductController);
  }
}
