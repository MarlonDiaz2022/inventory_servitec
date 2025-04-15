import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class maintenances{

@Prop({required: true,unique:true, uppercase:true, trim:true})
maintenancescode: string;

@Prop({ type: Types.ObjectId, ref: 'tools', required: true })
toolcode: Types.ObjectId;

@Prop({required: true, uppercase:true, trim:true})
model: string;

@Prop({required: true,unique:true, uppercase:true, trim:true, Unique: true})
code: string;

@Prop({required: true,unique:true, uppercase:true, trim:true, Unique: true})
serial: string;

@Prop({required: true, uppercase:true, trim:true})
maintenancesdate: number;

@Prop({required: true, uppercase:true, trim:true})
comment: string;
}

export const maintenancesSchema = SchemaFactory.createForClass(maintenances)