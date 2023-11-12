import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  title: string;
  @Prop()
  price : number
  @Prop()
  description: string;
  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);