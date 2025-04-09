import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { assignment } from './schema/assignment.schema';
import { AssignmentModule } from './assignment.module';
import { Model } from "mongoose";
import { createassignamentdto } from './dto/create-assignmenty.dto';
import { updateassignmentdto } from './dto/update-assignment.dto';
import { tools } from 'src/tools/schemas/tools.schema';
import { users } from 'src/users/schemas/users.schema';
import { identity } from 'rxjs';

@Injectable()
export class AssignmentService {

constructor(@InjectModel('assignment') private assignmentModel: Model<assignment>,
@InjectModel('tools') private toolModel: Model<tools>,
@InjectModel('users') private userModel: Model<users>,){}

async getassignments(){
  console.log("entre")
  const assignments = await this.assignmentModel.find().populate('worker tool'); 
  return assignments;
}

async getassignment(id:string){

    const existassignment = await this.assignmentModel.
    findById(id)
    .populate('worker tool');

      if(!existassignment){
        throw new ConflictException(`assignement with ${id} no exist`);
      }
      return existassignment
}

async createassignment(createassignment:createassignamentdto){
    const tool = await this.toolModel.findOne({ _id: createassignment.toolId}).lean()
    const worker = await this.userModel.findById(createassignment.workerId);
   if(!tool ){
    throw new ConflictException(`the assignment can't created because tools with code${tool} dont exist`)
   }
  
   
  if (!worker || createassignment.workerId.toString() !== worker._id.toString()) {
    throw new ConflictException(
      `The assignment can't be created because worker with ID ${createassignment.workerId} doesn't exist`
    );
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

async deleteassignment(id: string) {
      const existselement = await this.assignmentModel.findById(id);
      if (!existselement) {
        throw new ConflictException(`No existe una asignación con el ID ${id}`);
      }
      await this.assignmentModel.findByIdAndDelete(id);
      return existselement;

}

async updateuassignment(element: updateassignmentdto) {

  const existselementOri = await this.assignmentModel.findOne({ identify: element.identify });
    console.log("entre")
    if (!existselementOri) {
        throw new ConflictException(`La asignación con código ${element.identify} no existe`);
      }
    await this.assignmentModel.updateOne({ identify: element.identify }, { $set: element });

    const updated = await this.assignmentModel.findOne({ identify: element.identify });
    
    return updated?.populate('worker tool');
}


 

   }














