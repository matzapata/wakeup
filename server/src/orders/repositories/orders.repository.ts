import { Injectable } from '@nestjs/common';
import { Order, Prisma, Product } from '@prisma/client';
import { PrismaService } from '@src/database/prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(restaurantId: Order['restaurantId']): Promise<Order> {
    return this.prisma.order.create({
      data: {
        restaurant: { connect: { id: restaurantId } },
      },
    });
  }

  addItem(
    orderId: Order['id'],
    productId: Product['id'],
    data: Omit<Prisma.OrderItemCreateInput, 'order' | 'product'>,
  ) {
    return this.prisma.orderItem.create({
      data: {
        order: { connect: { id: orderId } },
        product: { connect: { id: productId } },
        ...data,
      },
    });
  }

  getAll(restaurantId: Order['restaurantId']): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { restaurantId },
    });
  }
}
