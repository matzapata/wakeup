import { TestBed } from '@automock/jest';
import { OrdersService } from './orders.service';
import { OrdersRepository } from '../repositories/orders.repository';
import { Order, OrderItem } from '@prisma/client';
import { ProductsService } from '@src/products/services/products.service';
import { BadRequestException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: jest.Mocked<OrdersRepository>;
  let productsService: jest.Mocked<ProductsService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(OrdersService).compile();

    service = unit;
    repository = unitRef.get(OrdersRepository);
    productsService = unitRef.get(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create should create an orderItem for each item and  in db and return it', async () => {
    // prepare
    const orderId = 1;
    const orderItemId = 1;
    const restaurantId = 'restaurant-id';
    const product = {
      id: 'product-id',
      name: 'product',
      createdAt: new Date(),
      price: 10,
      updatedAt: new Date(),
      restaurantId: restaurantId,
    };
    const orderItem = { productId: product.id, quantity: 1 };
    repository.create.mockResolvedValue({
      id: orderId,
    } as Order);
    repository.addItem.mockResolvedValue({
      id: orderItemId,
    } as OrderItem);
    productsService.getById.mockResolvedValue(product);

    // execute
    const res = await service.create(restaurantId, [orderItem]);

    // assert
    expect(repository.create).toHaveBeenCalledWith(restaurantId);
    expect(productsService.getById).toHaveBeenCalledWith(product.id);
    expect(repository.addItem).toHaveBeenCalledWith(orderId, product.id, {
      quantity: orderItem.quantity,
      unitPrice: product.price,
      totalPrice: product.price * orderItem.quantity,
    });
    expect(res).toEqual({ id: orderId });
  });

  it('create should throw an error if items length is cero', async () => {
    try {
      await service.create('restaurant-id', []);
      fail("create didn't throw error on missing items");
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe('order requires at least one item');
      expect(productsService.getById).not.toHaveBeenCalled();
      expect(repository.addItem).not.toHaveBeenCalled();
      expect(repository.create).not.toHaveBeenCalled();
    }
  });

  it('create should throw an error if any item quantity is below or equal to zero', async () => {
    try {
      await service.create('restaurant-id', [{ productId: '1', quantity: -1 }]);
      fail("create didn't throw an error on negative quantity");
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe('quantity has to be greater than 0');
      expect(productsService.getById).not.toHaveBeenCalled();
      expect(repository.addItem).not.toHaveBeenCalled();
      expect(repository.create).not.toHaveBeenCalled();
    }
  });
});
