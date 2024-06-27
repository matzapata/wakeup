import { Restaurant } from '@prisma/client';
import { IsString, Length } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @Length(8, 20)
  readonly name: Restaurant['name'];
}
