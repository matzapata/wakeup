import { Restaurant } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

export class RestaurantDto {
  @Expose()
  id: Restaurant['id'];

  @Expose()
  name: Restaurant['name'];
}

export class PaginatedRestaurantsDto {
  @Expose()
  @Type(() => RestaurantDto)
  restaurants: RestaurantDto[];

  @Expose()
  count: number;

  @Expose()
  page: number;

  @Expose()
  pageSize: number;

  @Expose()
  totalPages: number;
}
