import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'; 
import { LoggerMiddleware } from './logger/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { users, usersSchema } from './schemas/users.schema';

 
@Module({
  imports: [MongooseModule.forFeature([
    {
      name: users.name, schema: usersSchema}
  ])],
  controllers: [UsersController],
  providers: [UsersService],

})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/users')
  }

}
