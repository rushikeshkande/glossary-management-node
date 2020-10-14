import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../../middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { StudentModule } from '../user/user.module';
import { ProductSchema } from '../product/product.schema';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING,{ useNewUrlParser: true }),
  MongooseModule.forFeature([
    {name: 'user', schema: UserSchema},
    {name: 'product', schema: ProductSchema}
  ]),
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  AppModule,
  StudentModule,
  ProductModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AppController);
  }
}
