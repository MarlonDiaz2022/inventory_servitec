import { Module } from '@nestjs/common';
import { AssignmentSchema } from './schema/assignment.schema';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { usersSchema } from 'src/users/schemas/users.schema';
import { toolsSchema } from 'src/tools/schemas/tools.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: usersSchema },
      { name: 'tools', schema: toolsSchema },
      { name: 'assignment', schema: AssignmentSchema }
    ]),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})

export class AssignmentModule {}
