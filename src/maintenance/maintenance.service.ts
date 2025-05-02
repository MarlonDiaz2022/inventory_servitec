import { ConflictException, Injectable } from '@nestjs/common';
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
    return this.maintenanceModel.find().populate({ path: 'toolID', strictPopulate: false });
  }

  async getmaintenance(code: string) {
    console.log(code);
    const maintenance = await this.maintenanceModel
      .findOne({ maintenancescode: code })
      .populate('toolID'); 
  
    if (!maintenance) {
      throw new ConflictException(`maintenance with code ${code} does not exist`);
    }
  
    return maintenance;
  }


  async createmaintenance( createmaintenance: Createmaintenancedto) {
    const tool = await this.toolModel.findOne({ _id: createmaintenance.toolID}).lean()
    
    if (!tool) { 
      throw new ConflictException(`maintenance with ${createmaintenance.toolID} no exist`)
    }
    const maintcode = `ASSIGN-${Date.now()}`;
    
  await this.toolsService.ismaintenence(tool?.code)
  return new this.maintenanceModel({
  maintenancescode: maintcode,  
  toolID: tool._id,
  comment:createmaintenance.comments}).save();
}

  async updatemaintenance( updateMaintenance: UpdateMaintenanceDto) {
    
    const maintenance= await this.maintenanceModel.findOne({maintenancescode : updateMaintenance.maintenancecode})

    if(!maintenance){
      throw new ConflictException(`maintenance with ${updateMaintenance.maintenancecode} no exist`)
    }

    this.maintenanceModel.updateOne({identify:updateMaintenance.maintenancecode},{$set:updateMaintenance})

    const update= await this.maintenanceModel.findOne({identify : updateMaintenance.maintenancecode}).populate('tools').populate('maintenance')

    return maintenance;

  }

  async deletemaintenanace( maintenancescode : string) {
   
    const element = await this.maintenanceModel.findById(maintenancescode)

    if(!element){
      throw new ConflictException (`maintenance with ${maintenancescode} no exist`)
    }

    await this.maintenanceModel.findByIdAndDelete(maintenancescode)

    return element

  }

  async changestuatus(code:string){
    const tool = await this.toolModel.findById(code).lean()
    if (!tool) { 
      throw new ConflictException(`maintenance with ${code} no exist`)
    }
      await this.toolsService.changestatus(code);
}

}
