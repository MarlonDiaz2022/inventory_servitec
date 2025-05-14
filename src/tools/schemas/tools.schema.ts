import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class tools{

@Prop({required: true,unique:true, uppercase:true, trim:true})
name: string;

@Prop({required: true, uppercase:true, trim:true})
brand: string;

@Prop({required: true, uppercase:true, trim:true})
model: string;

@Prop({required: true,unique:true, uppercase:true, trim:true, Unique: true})
code: string;

@Prop({required: true,unique:true, uppercase:true, trim:true, Unique: true})
serial: string;

@Prop({required: true, uppercase:true, trim:true})
amount: number;

@Prop({required:true})
operating:boolean

@Prop({required:true})
maintenance:boolean

@Prop()
imageUrl: string;
}

export const toolsSchema = SchemaFactory.createForClass(tools)