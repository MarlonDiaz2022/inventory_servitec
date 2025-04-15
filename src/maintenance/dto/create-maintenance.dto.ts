import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class Createmaintenancedto {

    
@IsString() 
@MinLength(1)
@IsNotEmpty()
toolcode:String;

@IsString() 
@MinLength(1)
@IsNotEmpty()
comments:string;
}
