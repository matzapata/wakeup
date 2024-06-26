import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RestaurantsService } from '../restaurants/services/restaurants.service';
import { Serialize } from '@src/interceptors/serialize.interceptor';
import { CreateRestaurantDto } from '../restaurants/dtos/create-restaurant.dto';
import { RestaurantDto } from '../restaurants/dtos/restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  //  TODO: only admin
  @Post()
  @Serialize(RestaurantDto)
  create(@Body() data: CreateRestaurantDto) {
    return this.restaurantsService.create(data.name);
  }

  //  TODO: only admin
  @Post(':id/products')
  createProduct() {}

  @Get()
  @Serialize(RestaurantDto)
  getPaginated(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.restaurantsService.getPaginated(page, pageSize);
  }

  @Get(':id')
  @Serialize(RestaurantDto)
  getById() {}

  @Get(':id/products')
  getProducts() {}

  @Get(':id/products/:productId')
  getProductById() {}
}
