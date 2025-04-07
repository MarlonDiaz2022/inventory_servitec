import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { createassignamentdto } from './dto/create-assignmenty.dto';
import { updateassignmentdto } from './dto/update-assignment.dto';

@Controller('assignment')
export class AssignmentController {

assignmentservice:AssignmentService

constructor (assignmentS:AssignmentService){

    this.assignmentservice=assignmentS;
}

@Get()
getassignmnets(){

    this.assignmentservice.getassignments();
}

@Get()
getassignmnet(identify: string){

    this.assignmentservice.getassignment(identify);
}

@Post()
createassignmnet(assignement:createassignamentdto){
    this.assignmentservice.createassignment(assignement);
}

@Put()
updateassignment(assignement:updateassignmentdto){
    
    this.assignmentservice.updateuassignment(assignement);
}

@Delete()
deleteassignment(identify:string){

        this.assignmentservice.deleteassignment(identify);
}



}
