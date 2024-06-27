import { Product } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

export class ProductDto {
  @Expose()
  id: Product['id'];

  @Expose()
  name: Product['name'];

  @Expose()
  price: Product['price'];
}

export class PaginatedProductsDto {
  @Expose()
  @Type(() => ProductDto)
  products: ProductDto[];

  @Expose()
  count: number;

  @Expose()
  page: number;

  @Expose()
  pageSize: number;

  @Expose()
  totalPages: number;
}
