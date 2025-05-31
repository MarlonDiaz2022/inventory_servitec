import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Createmaintenancedto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { maintenances } from './schema/maintenance.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { tools } from 'src/tools/schemas/tools.schema';
import { ToolsService } from 'src/tools/tools.service';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectModel('maintenances') private maintenanceModel: Model<maintenances>,
    @InjectModel('tools') private toolModel: Model<tools>,
    private readonly toolsService: ToolsService,
  ) {}

  getmaintenances() {
    return this.maintenanceModel.find().populate('toolID');
  }

  async getmaintenance(code: string) {
    console.log(code);
    const maintenance = await this.maintenanceModel
      .findById({ _id: code })
      .populate('toolID');

    if (!maintenance) {
      throw new ConflictException(
        `maintenance with code ${code} does not exist`,
      );
    }

    return maintenance;
  }

  async createmaintenance(createmaintenance: Createmaintenancedto) {
    const tool = await this.toolModel
      .findOne({ _id: createmaintenance.toolID })
      .lean();
    if (!tool) {
      throw new ConflictException(
        `maintenance with ${createmaintenance.toolID} no exist`,
      );
    }
    const maintcode = `ASSIGN-${Date.now()}`;
    await this.toolsService.ismaintenence(tool?.code);
    await this.toolsService.changestatus(tool?.code);
    return new this.maintenanceModel({
      maintenancescode: maintcode,
      toolID: tool._id,
      comment: createmaintenance.comment,
    }).save();
  }

  async updatemaintenance(
    id: string,
    updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    const existingMaintenance = await this.maintenanceModel.findById(id);

    if (!existingMaintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found`);
    }

    const updatedMaintenance = await this.maintenanceModel
      .findByIdAndUpdate(id, updateMaintenanceDto, { new: true })
      .populate('toolID');

    if (!updatedMaintenance) {
      throw new ConflictException('Failed to update maintenance');
    }

    return updatedMaintenance;
  }

  async deletemaintenanace(maintenancescode: string) {
    const element = await this.maintenanceModel.findById(maintenancescode);

    if (!element) {
      throw new ConflictException(
        `maintenance with ${maintenancescode} no exist`,
      );
    }

    await this.maintenanceModel.findByIdAndDelete(maintenancescode);

    return element;
  }

  async changeStatus(id: string) {
    const element = await this.maintenanceModel.findById(id).populate('toolID');

    if (!element) {
      throw new ConflictException(`maintenance with code ${id} does not exist`);
    }

    if (element.status) {
      element.status = false;
      await this.toolsService.changestatus((element.toolID as any)?.code);
    } else {
      element.status = true;
      await this.toolsService.changestatus((element.toolID as any)?.code);
    }
    await this.toolsService.ismaintenence((element.toolID as any).code);
    await element.save();
    return element; // Es bueno retornar el elemento actualizado
  }
}
