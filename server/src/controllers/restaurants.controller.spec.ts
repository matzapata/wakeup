import { ProductsService } from '@src/products/services/products.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from '@src/restaurants/services/restaurants.service';
import { OrdersService } from '@src/orders/services/orders.service';
import { TestBed } from '@automock/jest';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let productsService: jest.Mocked<ProductsService>;
  let restaurantsService: jest.Mocked<RestaurantsService>;
  let ordersService: jest.Mocked<OrdersService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(RestaurantsController).compile();

    controller = unit;
    productsService = unitRef.get(ProductsService);
    restaurantsService = unitRef.get(RestaurantsService);
    ordersService = unitRef.get(OrdersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.todo('create should call restaurantsService.create');
  it.todo('create should serialize with RestaurantDto');
  it.todo('create should be guarded by AdminGuard');

  it.todo('getPaginated should call restaurantsService.getPaginated');
  it.todo('getPaginated should serialize with PaginatedRestaurantsDto');
  it.todo('getPaginated should default page to 1 and pageSize to 10');

  it.todo('getById should call restaurantsService.getById');
  it.todo('getById should serialize with RestaurantDto');

  it.todo('createProduct should call productsService.create');
  it.todo('createProduct should serialize with ProductDto');
  it.todo('createProduct should be guarded by AdminGuard');

  it.todo('getProducts should call productsService.getPaginated');
  it.todo('getProducts should serialize with PaginatedProductsDto');
  it.todo('getProducts should default page to 1 and pageSize to 10');

  it.todo('getProductById should call productsService.getById');
  it.todo('getProductById should serialize with ProductDto');

  it.todo('createOrder should call ordersService.createOrder');
  it.todo('createOrder should serialize with OrderDto');
});
