import { Expose } from 'class-transformer';

export class ProductDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  price: number;
}
