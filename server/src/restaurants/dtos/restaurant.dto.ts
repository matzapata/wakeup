import { Expose } from 'class-transformer';

export class RestaurantDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
