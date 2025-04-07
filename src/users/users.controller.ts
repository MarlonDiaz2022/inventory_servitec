import { Controller, Get, Post,Put,Delete,Patch, Body, Param, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { createuserdto } from './dto/create-user.dto';
import { updateuserdto } from './dto/update-user.dto';

@Controller('/users')
    export class UsersController {

usersService:UsersService;

    constructor(userService: UsersService){
           
        this.usersService=userService;
    }
@Get()
getAllusers(){
   return this.usersService.getusers();
}

@Get('/:id')
getuser(@Param('id') id : string){
   return this.usersService.getuser(id);
}


@Post()
createuser(@Body() user : createuserdto){
    return this.usersService.createuser(user)
}

@Put()
updateuser(@Body() user: updateuserdto){
    return this.usersService.updateuser(user)
}

@Delete('/:cedula')
deleteuser(@Param('cedula') cedula: string) {
  return this.usersService.deleteuser(cedula);
}





}

