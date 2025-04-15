import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';
import { MongooseModule } from '@nestjs/mongoose';
import { tools, toolsSchema } from './schemas/tools.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: tools.name, schema: toolsSchema }])
  ],
  controllers: [ToolsController],
  providers: [ToolsService],
  exports:[ToolsService]
})
export class ToolsModule {}
