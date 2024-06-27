import { Order } from '@prisma/client';
import { Expose } from 'class-transformer';

export class OrderDto {
  @Expose()
  id: Order['id'];
}
