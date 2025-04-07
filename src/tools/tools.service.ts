import { Injectable,ConflictException } from "@nestjs/common";
import { createtooldto } from "./dto/create-tool.dto";
import { updatetoolsdto } from "./dto/update-tools.dto";
import { InjectModel } from "@nestjs/mongoose";
import { tools } from "./schemas/tools.schema";
import { Model } from "mongoose";


@Injectable()
export class toolsService{

  
constructor(@InjectModel(tools.name) private toolsModel : Model<tools>){}

gettools(){
  return this.toolsModel.find()
}

async gettool(code:string){
  const existsusers = await this.toolsModel.findOne({code})
  if(!existsusers){
    throw new ConflictException(`tool with ${code} no exist`);
  }
  
  return this.toolsModel.findOne({code});
}

async createtool(tool: createtooldto) {
  const existsusers = await this.toolsModel.findOne({ name: tool.name }); 
  if (existsusers) {
    throw new ConflictException(`tool ${tool.name} already exists`);
  }
  const newUser = new this.toolsModel(tool); 
  return newUser.save();
}


async updatetool(tool:updatetoolsdto){

  const existstoolOri = await this.toolsModel.findOne({code:tool.code})
  if(!existstoolOri){
    throw new ConflictException(`tool with ${tool.code} no exist`)
  }
  if (tool.code) {
    const existsUser = await this.toolsModel.findOne({ code: tool.code });

    if (existsUser && existsUser.code !== tool.code) {
      throw new ConflictException(`the name ${tool.name} is ready use`);
    }
  }
  await this.toolsModel.updateOne({ cedula: tool.code}, { $set: tool });
  return this.toolsModel.findOne({ cedula:tool.code });
}


async deletetools(code: string) {
  const existsUser = await this.toolsModel.findOne({ code });
  if (!existsUser) {
    throw new ConflictException(`the tools with ${code} not exist`);
  }
  await this.toolsModel.deleteOne({ code});

  return existsUser;
}




}