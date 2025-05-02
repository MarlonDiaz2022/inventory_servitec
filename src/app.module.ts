import { Module } from '@nestjs/common';
import { ToolsModule } from './tools/tools.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AssignmentModule } from './assignment/assignment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { maintenanceModule } from './maintenance/maintenance.module';


@Module({
  imports: [ToolsModule, AuthModule, UsersModule, AssignmentModule,maintenanceModule,
       MongooseModule.forRoot('mongodb://localhost:27017/Servictec'),
    ] 

})
export class AppModule {}
