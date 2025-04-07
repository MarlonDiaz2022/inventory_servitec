import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { usersSchema } from 'src/users/schemas/users.schema';
import { toolsSchema } from 'src/tools/schemas/tools.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'assignment', schema: usersSchema },
      { name: 'tools', schema: toolsSchema },
    ]),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})

export class AssignmentModule {}
