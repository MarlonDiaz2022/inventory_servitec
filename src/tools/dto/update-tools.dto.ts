import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class updatetoolsdto{

  name?: string;
  model?: string;
  code?:string;
  serial?:string;
  amount? : number;
  imageUrl?: string;
  operating?:boolean;

      }