import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from '@src/orders/services/orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
