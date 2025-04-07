import { Module } from '@nestjs/common';
import { ToolsModule } from './tools/tools.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AssignmentModule } from './assignment/assignment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurationMongo } from './configuration/configuration.-mongo';

@Module({
  imports: [ToolsModule, AuthModule, UsersModule, AssignmentModule,
    MongooseModule.forRoot('mongodb://localhost:27017/Servictec'), UsersModule,ToolsModule ] 

})
export class AppModule {}
