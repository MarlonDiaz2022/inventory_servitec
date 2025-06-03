import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { UserRoles } from 'src/Enum/user-roler.enum';

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

  @IsEnum(UserRoles, { message: 'El valor ingresado deber ser mayuscula(ADMIN, WORKER)' })
  @IsNotEmpty({ message: 'El rol no puede estar vacío' })
  readonly role: UserRoles; 


      }

