import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { toolsSchema } from 'src/tools/schemas/tools.schema';
import { maintenances, maintenancesSchema } from './schema/maintenance.schema';
import { ToolsService } from 'src/tools/tools.service';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: 'maintenances', schema: maintenancesSchema },
        { name: 'tools', schema: toolsSchema },
      ]),
    ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService,ToolsService],
})
export class maintenanceModule {}
