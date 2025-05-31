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
@Put('/:id')
updateassignment(@Param('id') id:string, @Body()assignement:updateassignmentdto){   
    return this.assignmentservice.updateuassignment(id, assignement);
}

@Put('change/:id')
changeStatus(@Param('id') id: string){   
    return this.assignmentservice.changestatus(id);
}

@Delete(':identify')
deleteassignment(@Param('identify') identify: string) {
    return this.assignmentservice.deleteassignment(identify);
}
}
