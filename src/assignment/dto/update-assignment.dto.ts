import { tools } from "src/tools/schemas/tools.schema"
import { users } from "src/users/schemas/users.schema"

export class updateassignmentdto{
        identify?: string;
        workerId?: users;
        toolId?: tools;
        place?:string;
        date_of_loan?: Date  ;   
        delivery_date?: Date;
        status?: boolean;
}