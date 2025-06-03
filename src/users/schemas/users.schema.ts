
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcryptjs'; 
import { UserRoles } from "src/Enum/user-roler.enum";

@Schema()
export class users{

@Prop({required: true,unique:true, uppercase:true, trim:true})
name: string;

@Prop({required: true,unique:true, uppercase:true, trim:true})
cedula: string;

@Prop({required: true,unique:true, uppercase:true, trim:true})
phone: string;

@Prop({required: true,select: false})
password: string;

@Prop({type: String,enum: Object.values(UserRoles),default: UserRoles.WORKER,required: true, uppercase: true, trim: true})
  role: UserRoles; 
}

export const usersSchema = SchemaFactory.createForClass(users);

usersSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

usersSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}