import {
  IsInt,
  IsPositive,
  IsArray,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from '@prisma/client';

class ItemDto {
  @IsString()
  productId: OrderItem['productId'];

  @IsInt()
  @IsPositive()
  quantity: OrderItem['quantity'];
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  readonly items: ItemDto[];
}
