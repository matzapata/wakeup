import { Injectable } from '@nestjs/common';
import { RestaurantsRepository } from '../repositories/restaurants.respository';
import { Restaurant } from '@prisma/client';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

  create(name: string): Promise<Restaurant> {
    return this.restaurantsRepository.create(name);
  }

  getById(id: string): Promise<Restaurant | null> {
    return this.restaurantsRepository.getById(id);
  }

  async getPaginated(
    page: number,
    pageSize: number,
  ): Promise<{
    restaurants: Restaurant[];
    count: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const restaurants = await this.restaurantsRepository.getPaginated(
      page,
      pageSize,
    );
    const count = await this.restaurantsRepository.count();

    return {
      restaurants,
      count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    };
  }
}
