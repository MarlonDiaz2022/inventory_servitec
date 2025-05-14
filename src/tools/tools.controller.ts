import { Controller, Get, Post,Put,Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { createtooldto } from './dto/create-tool.dto';
import { updatetoolsdto } from './dto/update-tools.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('/tools')
    export class ToolsController {

toolsService:ToolsService;

    constructor(toolservice: ToolsService){
           
        this.toolsService=toolservice;
    }
@Get()
getAllusers(){
   return this.toolsService.gettools()
}

@Get('/:code')
getuser(@Param('code') code : string){
   return this.toolsService.gettool(code);
}


@Post()
@UseInterceptors(FileInterceptor('imageUrl', {
  storage: diskStorage({
    destination: './uploads/tools',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
}))

async createTool(
  @Body() data: createtooldto,
  @UploadedFile() file: Express.Multer.File,
) {
  const imageUrl = file ? `/uploads/tools/${file.filename}` : '';
  return this.toolsService.createtool({ ...data, imageUrl });
}


@Put(':id')
@UseInterceptors(FileInterceptor('imageUrl', {
  storage: diskStorage({
    destination: './uploads/tools',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
}))
async updateTool(
  @Param('id') id: string,
  @Body() body: updatetoolsdto,
  @UploadedFile() file?: Express.Multer.File,
) {
  const updatedData: updatetoolsdto = {
    ...body,
    imageUrl: file ? `/uploads/tools/${file.filename}` : body.imageUrl,
  };

  return this.toolsService.updatetool(id, updatedData);
}

@Delete('/:code')
deletetool(@Param('code') code: string) {
  return this.toolsService.deletetools(code);
}





}
