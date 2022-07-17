import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Schema()
export class Product extends Document{
  @Prop( { required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product)