import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RestaurantsService } from '../restaurants/services/restaurants.service';
import { Serialize } from '@src/common/interceptors/serialize.interceptor';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { PaginatedRestaurantsDto, RestaurantDto } from './dtos/restaurant.dto';
import { ProductsService } from '@src/products/services/products.service';
import { OrdersService } from '@src/orders/services/orders.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PaginatedProductsDto, ProductDto } from './dtos/product.dto';
import { AdminGuard } from '@src/common/guards/admin.guard';
import { OrderDto } from './dtos/order.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @Serialize(RestaurantDto)
  create(@Body() data: CreateRestaurantDto) {
    return this.restaurantsService.create(data.name);
  }

  @Get()
  @Serialize(PaginatedRestaurantsDto)
  getPaginated(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.restaurantsService.getPaginated(page, pageSize);
  }

  @Get(':id')
  @Serialize(RestaurantDto)
  getById(@Param('id') restaurantId: string) {
    return this.restaurantsService.getById(restaurantId);
  }

  @Post(':id/products')
  @UseGuards(AdminGuard)
  @Serialize(ProductDto)
  createProduct(@Param('id') restaurantId, @Body() data: CreateProductDto) {
    return this.productsService.create(restaurantId, data.name, data.price);
  }

  @Get(':id/products')
  @Serialize(PaginatedProductsDto)
  getProducts(
    @Param('id') restaurantId: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.productsService.getPaginated(restaurantId, page, pageSize);
  }

  @Get(':id/products/:productId')
  @Serialize(ProductDto)
  getProductById(@Param('productId') productId: string) {
    return this.productsService.getById(productId);
  }

  @Post(':id/orders')
  @Serialize(OrderDto)
  createOrder(@Param('id') restaurantId: string, @Body() data: CreateOrderDto) {
    return this.ordersService.create(restaurantId, data.items);
  }
}
