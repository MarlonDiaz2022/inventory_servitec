import { IsNotEmpty,IsString } from "class-validator";



export class createassignamentdto {

    @IsNotEmpty()
    @IsString()
    workerId: string;
  
    @IsNotEmpty()
    @IsString()
    toolId: string;
  
    @IsNotEmpty()
    place: string;
  
    @IsNotEmpty()
    status: boolean;
  }