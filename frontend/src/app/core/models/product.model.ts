export interface IProduct {
  _id?:         string;
  sku?:         string;
  name?:        string;
  description?: string;
  image?:       string;
  tags?:        string[];
  price?:       number;
  stock?:       number;
}