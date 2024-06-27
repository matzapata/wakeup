import { Product } from '@prisma/client';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(4, 20)
  readonly name: Product['name'];

  @IsNumber()
  readonly price: Product['price'];
}
