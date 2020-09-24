import { Module, MiddlewareConsumer, RequestMethod, Get } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { UserController } from './user.controller';
// import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { AuthMiddleware } from '../../middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class StudentModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes(StudentController);
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/user/login', method: RequestMethod.POST },
        { path: '/user/add-user', method: RequestMethod.POST },
        { path: '/user/all-users', method: RequestMethod.GET},
      )
      .forRoutes(UserController);
  }
}
