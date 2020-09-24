import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './modules/user/user.schema';
import { StudentModule } from './modules/user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://rushi123:rushi123@cluster0.ter0c.mongodb.net/glossary_app?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true',{ useNewUrlParser: true }),
  MongooseModule.forFeature([
    {name: 'user', schema: UserSchema}
  ]),
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  AppModule,
  StudentModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AppController);
  }
}
