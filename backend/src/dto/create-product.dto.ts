import { IsArray, IsInt, IsPositive, IsString } from "class-validator";

export class CreateProductDto {

  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsArray()
  tags: string[];

  @IsInt()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  stock: number;
}