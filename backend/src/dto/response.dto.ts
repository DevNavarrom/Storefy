import { Product } from "src/entities/product.entity";

export class ProductsResponseDTO {
  products: Product[];
  limit: number;
  total: number;
  skip: number;
}