import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { toolsService } from './tools.service';
import { MongooseModule } from '@nestjs/mongoose';
import { tools, toolsSchema } from './schemas/tools.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: tools.name, schema: toolsSchema }])
  ],
  controllers: [ToolsController],
  providers: [toolsService]
})
export class ToolsModule {}
