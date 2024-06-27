import { Expose } from 'class-transformer';

export class OrderDto {
  @Expose()
  id: string;

  @Expose()
  products: number;
}
