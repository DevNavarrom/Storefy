import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document {

  @Prop({unique: true, index: true, required: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop([String])
  tags: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass( Product );