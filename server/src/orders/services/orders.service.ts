import { BadRequestException, Injectable } from '@nestjs/common';
import { Order, Product } from '@prisma/client';
import { OrdersRepository } from '../repositories/orders.repository';
import { ProductsService } from '@src/products/services/products.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsService: ProductsService,
  ) {}

  async create(
    restaurantId: Order['restaurantId'],
    items: { productId: Product['id']; quantity: number }[],
  ): Promise<Order> {
    // don't allow orders without items
    if (items.length === 0) {
      throw new BadRequestException('order requires at least one item');
    }

    // Don't allow quantity <= 0
    if (items.find((i) => i.quantity <= 0)) {
      throw new BadRequestException('quantity has to be greater than 0');
    }

    // create the order
    const order = await this.ordersRepository.create(restaurantId);

    // create items and attach them to the order
    await Promise.all(
      items.map(async (i): Promise<void> => {
        const product = await this.productsService.getById(i.productId);
        await this.ordersRepository.addItem(order.id, product.id, {
          quantity: i.quantity,
          unitPrice: product.price,
          totalPrice: product.price * i.quantity,
        });
      }),
    );

    return order;
  }

  getAll(restaurantId: Order['restaurantId']): Promise<Order[]> {
    return this.ordersRepository.getAll(restaurantId);
  }
}
