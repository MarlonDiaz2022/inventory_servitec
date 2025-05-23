import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class createtooldto{

  @IsString() 
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @IsString() 
  @MinLength(1) 
  model: string;

  @IsString() 
  @MinLength(1) 
  brand: string;
  
  @IsString() 
  @MinLength(1)
  @IsNotEmpty() 
  code:string;

  @IsString() 
  @MinLength(1)
  @IsNotEmpty() 
  serial:string;

  @IsNotEmpty()
  amount : number

  @IsNotEmpty()
  operating:boolean;

  @IsNotEmpty()
  maintenance:boolean
  
  imageUrl: string;
      }