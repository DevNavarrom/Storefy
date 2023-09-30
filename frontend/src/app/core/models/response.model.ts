export class ResponseProducts<T> {
  limit!: number;
  products!: T[];
  skip!: number;
  total!: number;
}