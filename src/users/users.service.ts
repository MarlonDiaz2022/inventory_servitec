import { Injectable,Get, Post, Put, Delete, Patch, NotFoundException, ConflictException } from "@nestjs/common";
import { createuserdto } from "./dto/create-user.dto";
import { updateuserdto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { users } from "./schemas/users.schema";
import { Model } from "mongoose";


@Injectable()
export class UsersService{

  
constructor(@InjectModel(users.name) private usersModel : Model<users>){}

getusers(){
  return this.usersModel.find()
}

async getuser(cedula:string){
  const existsusers = await this.usersModel.findOne({cedula})
  if(!existsusers){
    throw new ConflictException(`user with ${cedula} no exist`);
  }
  
  return this.usersModel.findOne({cedula});
}

async createuser(user: createuserdto) {
  const existsusers = await this.usersModel.findOne({ name: user.name }); 

  if (existsusers) {
    throw new ConflictException(`User ${user.name} already exists`);
  }

  const newUser = new this.usersModel(user); 
  return newUser.save();
}


async updateuser(user:updateuserdto){

  const existsusersOri = await this.usersModel.findOne({cedula:user.cedula})
  if(!existsusersOri){
    throw new ConflictException('users with ${user.name} no exist')
  }
  if (user.name) {
    const existsUser = await this.usersModel.findOne({ name: user.name });

    if (existsUser && existsUser.cedula !== user.cedula) {
      throw new ConflictException(`El nombre ${user.name} ya está en uso`);
    }
  }
  await this.usersModel.updateOne({ cedula: user.cedula }, { $set: user });
  return this.usersModel.findOne({ cedula:user.cedula });
}


async deleteuser(cedula: string) {
  const existsUser = await this.usersModel.findOne({ cedula });
  if (!existsUser) {
    throw new ConflictException(`El usuario con cédula ${cedula} no existe`);
  }
  await this.usersModel.deleteOne({ cedula });

  return existsUser;
}




}