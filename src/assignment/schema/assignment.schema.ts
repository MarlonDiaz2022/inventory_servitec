import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Schema()
export class assignment {

  @Prop({ required: true, unique: true })
  identify: string;

  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  worker: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'tools', required: true })
  tool: Types.ObjectId;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true, default: () => new Date() })
  date_of_loan: Date;

  @Prop({ required: true, default:null})
  delivery_date: Date;

  @Prop({ required: true })
  status: boolean;
}

export const AssignmentSchema = SchemaFactory.createForClass(assignment);