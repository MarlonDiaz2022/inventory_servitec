import { ConflictException, Injectable } from '@nestjs/common';
import { Createmaintenancedto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { maintenances } from './schema/maintenance.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { tools } from 'src/tools/schemas/tools.schema';


@Injectable()
export class MaintenanceService {
  


  constructor(
    @InjectModel(maintenances.name) private maintenanceModel: Model<maintenances>,
    @InjectModel('tools') private toolModel: Model<tools>
  ) {}

  

  getmaintenances() {
    return this.maintenanceModel.find()
  }

  async getmaintenance(code: string) {

    const maintenance= await this.maintenanceModel.findById(code).populate('toolcode');

    if(!maintenance){
      throw new ConflictException(`maintenance with ${code} no exist`)
    }
    return maintenance;
  }


  async createmaintenance( createmaintenance: Createmaintenancedto) {
    const tool = await this.toolModel.findOne({ _id: createmaintenance.toolcode}).lean()
    console.log('Tool valido', tool);
    if (!tool) { 
      throw new ConflictException(`maintenance with ${createmaintenance.toolcode} no exist`)
    }
    const maintcode = `ASSIGN-${Date.now()}`;

  const element = new this.maintenanceModel({
  maintenancescode: maintcode,  
  toolcode: tool.code,
  model: tool.model,
  code: tool.code,
  serial: tool.code,
  maintenancedate: new Date(),
  comment:createmaintenance.comments})

  return element.save();

  }

  async updatemaintenance( updateMaintenance: UpdateMaintenanceDto) {
    
    const maintenance= await this.maintenanceModel.findOne({maintenancescode : updateMaintenance.identify})

    if(!maintenance){
      throw new ConflictException(`maintenance with ${updateMaintenance.identify} no exist`)
    }

    this.maintenanceModel.updateOne({identify:updateMaintenance.identify},{$set:updateMaintenance})

    const update= await this.maintenanceModel.findOne({identify : updateMaintenance.identify}).populate('tools').populate('maintenance')

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



}
