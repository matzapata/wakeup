import { Module } from '@nestjs/common';
import { OrdersService } from '@src/orders/services/orders.service';

@Module({
  controllers: [],
  providers: [OrdersService],
})
export class OrdersModule {}
