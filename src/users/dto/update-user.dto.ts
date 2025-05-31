import { UserRoles } from "src/Enum/user-roler.enum";

export class updateuserdto{

    
    name?: string;
    cedula?: string;
    telefono? :string;
    password?: string
    readonly role?: UserRoles; 

}