import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { assignment } from './schema/assignment.schema';
import { AssignmentModule } from './assignment.module';
import { Model } from "mongoose";
import { createassignamentdto } from './dto/create-assignmenty.dto';
import { updateassignmentdto } from './dto/update-assignment.dto';
import { tools } from 'src/tools/schemas/tools.schema';

@Injectable()
export class AssignmentService {

constructor(@InjectModel(assignment.name) private assignmentModel : Model<assignment>, @InjectModel(tools.name) private toolModel: Model<tools>){}

 getassignments(){
    this.assignmentModel.find()
 }

    async getassignment(identify:string){

    const existassignment = await this.assignmentModel.findOne({identify})
      if(!existassignment){
        throw new ConflictException(`assignement with ${identify} no exist`);
      }
      return this.assignmentModel.findOne({identify});
    }

   async createassignment(createassignment:createassignamentdto){
    const tool = await this.toolModel.findById(createassignment.toolId).lean();
    const worker = await this.assignmentModel.findOne({ idW :createassignment.workerId})
     
   if(!tool ){
    throw new ConflictException(`the assignment can't created because tools with code${tool} dont exist`)
   }
   const number = parseInt(tool.amount)
    if(number==0){
    throw new ConflictException(`The task cannot be created because there are no units of this tool`)
   }
   if (!worker){
    throw new ConflictException(`the assignment can't created because worker with code${tool} doesn't exist`)
   }
    const identify = `ASSIGN-${Date.now()}`;
        const assignment = new this.assignmentModel({
          identify,
          worker: createassignment.workerId,
          tool: createassignment.toolId,
          place: createassignment.place,
          delivery_date: createassignment.delivery_date,
          status: createassignment.status,
          date_of_loan: new Date()
        });
    
        return assignment.save();
    }

async deleteassignment(identify:string){
    const existsUser = await this.assignmentModel.findOne({ identify });
  if (!existsUser) {
    throw new ConflictException(`El usuario con cédula ${identify } no existe`);
  }
  await this.assignmentModel.deleteOne({ identify  });

  return existsUser;
}

async updateuassignment(element:updateassignmentdto){

  const existselementOri = await this.assignmentModel.findOne({identify: element.identify})
  if(!existselementOri){
    throw new ConflictException(`la asignacion no existe`)
  }
 
  await this.assignmentModel.updateOne({ cedula: element.identify }, { $set: element });
  return this.assignmentModel.findOne({ cedula:element.identify });
}



 

   }














