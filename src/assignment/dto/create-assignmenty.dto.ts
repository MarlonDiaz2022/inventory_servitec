import { IsNotEmpty,IsString } from "class-validator";
import { tools } from "src/tools/schemas/tools.schema";
import { users } from "src/users/schemas/users.schema";


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
    delivery_date: Date;
  
    @IsNotEmpty()
    status: boolean;
  }