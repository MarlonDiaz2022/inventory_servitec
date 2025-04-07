
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class users{

@Prop({required: true,unique:true, uppercase:true, trim:true})
name: string;

@Prop({required: true,unique:true, uppercase:true, trim:true})
cedula: string;

@Prop({required: true,unique:true, uppercase:true, trim:true})
phone: string;

@Prop({required: true,unique:true, uppercase:true, trim:true})
password: string;
}

export const usersSchema = SchemaFactory.createForClass(users)