import { Module } from '@nestjs/common';
import { OrdersService } from '@src/orders/services/orders.service';
import { OrdersRepository } from './repositories/orders.repository';
import { PrismaModule } from '@src/database/prisma.module';
import { ProductsModule } from '@src/products/products.module';

@Module({
  controllers: [],
  imports: [PrismaModule, ProductsModule],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
