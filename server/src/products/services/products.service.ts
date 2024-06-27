import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  create(
    restaurantId: Product['restaurantId'],
    name: Product['name'],
    price: Product['price'],
  ): Promise<Product> {
    if (price <= 0) {
      throw new BadRequestException('Price should be above 0');
    }

    return this.productsRepository.create(restaurantId, name, price);
  }

  getById(id: string) {
    return this.productsRepository.getById(id);
  }

  async getPaginated(
    restaurantId: Product['restaurantId'],
    page: number,
    pageSize: number,
  ) {
    const products = await this.productsRepository.getPaginated(
      restaurantId,
      page,
      pageSize,
    );
    const count = await this.productsRepository.count(restaurantId);

    return {
      products,
      count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    };
  }
}
