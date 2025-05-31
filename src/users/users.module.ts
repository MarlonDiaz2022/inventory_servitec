import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'; 
import { LoggerMiddleware } from './logger/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { users, usersSchema } from './schemas/users.schema';
import { AssignmentService } from 'src/assignment/assignment.service';
import { AssignmentSchema } from 'src/assignment/schema/assignment.schema';
import { toolsSchema } from 'src/tools/schemas/tools.schema';

 
@Module({
  imports: [MongooseModule.forFeature([
    { name: users.name, schema: usersSchema},
    { name: 'assignment', schema: AssignmentSchema },
    { name: 'tools', schema: toolsSchema},
  ])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/users')
  }

}
