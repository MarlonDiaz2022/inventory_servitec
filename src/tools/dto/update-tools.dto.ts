import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class updatetoolsdto{

  name?: string;
  model?: string;
  code?:string;
  amount? : string
  imageUrl?: string;

      }