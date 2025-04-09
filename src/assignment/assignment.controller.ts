import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { createassignamentdto } from './dto/create-assignmenty.dto';
import { updateassignmentdto } from './dto/update-assignment.dto';

@Controller('/assignments')
export class AssignmentController {

assignmentservice:AssignmentService
constructor (assignmentS:AssignmentService){
    this.assignmentservice=assignmentS;
}
@Get()
getassignmnets(){
    return this.assignmentservice.getassignments();
}
@Get(':identify')
getassignmnet(@Param('identify') identify: string){
   return this.assignmentservice.getassignment(identify);
}
@Post()
createassignmnet(@Body()assignement:createassignamentdto){
    return  this.assignmentservice.createassignment(assignement);
}
@Put()
updateassignment(@Body()assignement:updateassignmentdto){   
    return this.assignmentservice.updateuassignment(assignement);
}
@Delete(':identify')
deleteassignment(@Param('identify') identify: string) {
    return this.assignmentservice.deleteassignment(identify);
}
}
