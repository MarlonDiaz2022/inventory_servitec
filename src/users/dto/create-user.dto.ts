import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class createuserdto{


  @IsString() 
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @IsString() 
  @MinLength(1)
  @IsNotEmpty() 
  cedula: string;
  
  @IsString() 
  @MinLength(1)
  @IsNotEmpty() 
  phone :string;

  @IsString() 
  @MinLength(1) 
  @IsNotEmpty()
  password : string

      }

