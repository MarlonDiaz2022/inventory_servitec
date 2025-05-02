import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { Createmaintenancedto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';


@Controller('maintenances')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  createmaintenances(@Body() createMaintenanceDto: Createmaintenancedto) {
    
    return this.maintenanceService.createmaintenance(createMaintenanceDto)
  }

  @Get()
  getmaintenances() {
    return this.maintenanceService.getmaintenances();
  }

  @Get(':id')
  getmaintenance( @Param('id') id: string) {
    return this.maintenanceService.getmaintenance(id);
  }

  @Patch()
  updatemaintenances(@Body() updateMaintenanceDto: UpdateMaintenanceDto) {
    return this.maintenanceService.updatemaintenance( updateMaintenanceDto);
  }

  @Delete(':id')
  deletemaintenances(identify: string) {
    return this.maintenanceService.deletemaintenanace(identify);
  }
}
