import { Controller, Get, Post,Put,Delete,Patch, Body, Param, ValidationPipe, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { createuserdto } from './dto/create-user.dto';
import { updateuserdto } from './dto/update-user.dto';
import { RolesGuard } from 'src/guard/rol.guard';
import { Roles } from 'src/decorators/rol.decorator'; // Importa tu decorador de roles
import { UserRoles } from 'src/Enum/user-roler.enum';

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

@Get('/listTool/:id')
gettools(@Param('id') cedula: string){
    return this.usersService.listtools(cedula);
}

@Post()
async createuser(@Body() createuserDto: createuserdto) {
    return this.usersService.createuser(createuserDto);
  }

@Put(':id')
update(@Param('id') id: string, @Body() updateUserDto: updateuserdto) {
  return this.usersService.updateuser(id, updateUserDto);
}

@Delete('/:cedula')
deleteuser(@Param('cedula') cedula: string) {
  return this.usersService.deleteuser(cedula);
}


}

