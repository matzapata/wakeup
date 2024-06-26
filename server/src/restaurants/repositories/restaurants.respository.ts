import { Injectable } from '@nestjs/common';
import { Restaurant } from '@prisma/client';
import { PrismaService } from '@src/database/prisma.service';

@Injectable()
export class RestaurantsRepository {
  constructor(private prisma: PrismaService) {}

  create(name: string): Promise<Restaurant> {
    return this.prisma.restaurant.create({
      data: { name },
    });
  }

  getById(id: string): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({
      where: { id },
    });
  }

  getPaginated(page: number, pageSize: number): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  count(): Promise<number> {
    return this.prisma.restaurant.count();
  }
}
