import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '@src/database/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    restaurantId: Product['restaurantId'],
    name: Product['name'],
    price: Product['price'],
  ): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name,
        price,
        restaurant: {
          connect: { id: restaurantId },
        },
      },
    });
  }

  getById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  getPaginated(
    restaurantId: Product['restaurantId'],
    page: number,
    pageSize: number,
  ) {
    return this.prisma.product.findMany({
      where: { restaurantId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  count(restaurantId: Product['restaurantId']) {
    return this.prisma.product.count({ where: { restaurantId } });
  }
}
