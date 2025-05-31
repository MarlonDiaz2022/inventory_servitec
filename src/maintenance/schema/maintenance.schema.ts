import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true, versionKey: false })
export class maintenances{
    
@Prop({required: true,unique:true, uppercase:true, trim:true})
maintenancescode: string;

@Prop({ type: Types.ObjectId, ref: 'tools', required: true })
toolID: Types.ObjectId;

@Prop({required: true, uppercase:true, trim:true})
comment: string;

@Prop({ default : true })
status:boolean
}

export const maintenancesSchema = SchemaFactory.createForClass(maintenances)