import { Injectable,ConflictException, NotFoundException } from "@nestjs/common";
import { createtooldto } from "./dto/create-tool.dto";
import { updatetoolsdto } from "./dto/update-tools.dto";
import { InjectModel } from "@nestjs/mongoose";
import { tools} from "./schemas/tools.schema";
import { Model } from "mongoose";


@Injectable()
export class ToolsService{

  
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
  console.log('Archivo recibido:', tool.imageUrl);

  const newUser = new this.toolsModel(tool); 
  return newUser.save();
}


async updatetool(id: string, tool: updatetoolsdto) {
  const existsTool = await this.toolsModel.findById(id);

  if (!existsTool) {
    throw new ConflictException(`Tool with id ${id} does not exist`);
  }

  await this.toolsModel.updateOne({ _id: id }, { $set: tool });
  return this.toolsModel.findById(id);
}



async deletetools(code: string) {
  const existsUser = await this.toolsModel.findOne({ code });
  if (!existsUser) {
    throw new ConflictException(`the tools with ${code} not exist`);
  }
  await this.toolsModel.deleteOne({code});

  return existsUser;
}

async reduceamount(id:String, decrease=1){

  const element= await this.toolsModel.findById(id)
  if(element != null){  
    if (isNaN(Number(element.amount))) {
      throw new NotFoundException(`Tool with id ${id} has an invalid amount value`);
    }
  if(element.amount<=0){
    throw new ConflictException('the tools not reduce more')
  }  
    element.amount-=decrease;
    await element.save();
  }
}

async increaseamount(id:String, increase=1){

  const element= await this.toolsModel.findById(id)
  if(element != null){  
    if (isNaN(Number(element.amount))) {
      throw new NotFoundException(`Tool with id ${id} has an invalid amount value`);
    }
    element.amount+=increase;
    await element.save();
  }
}

async changestatus(code:string){
  const element = await this.toolsModel.findOne({code})
  if(!element){  
    throw new ConflictException(`tool with ${code} no exist`)
  }
  element.operating=false;
  await element.save()
}

async ismaintenence(code:string){
  const element = await this.toolsModel.findOne({code})
  if(!element){  
    throw new ConflictException(`tool with ${code} no exist`)
  }
  element.maintenance=true;
  await element.save()
}



}