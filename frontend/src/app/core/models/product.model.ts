export interface IProduct {
  sku?:         string;
  name?:        string;
  description?: string;
  image?:       string;
  tags?:        string[];
  price?:       number;
  stock?:       number;
}