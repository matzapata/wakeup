import { TestBed } from '@automock/jest';
import { ProductsService } from './products.service';
import { ProductsRepository } from '../repositories/products.repository';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: jest.Mocked<ProductsRepository>;
  const fakeProduct1 = {
    id: '1',
    name: 'product1',
    price: 10,
    restaurantId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const fakeProduct2 = {
    id: '2',
    name: 'product2',
    price: 20,
    restaurantId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ProductsService).compile();

    service = unit;
    repository = unitRef.get(ProductsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create should create a product and associate it with the restaurant', () => {
    repository.create.mockResolvedValue(fakeProduct1);

    expect(service.create('1', 'product', 10)).resolves.toEqual(fakeProduct1);
    expect(repository.create).toHaveBeenCalledWith('1', 'product', 10);
  });

  it('getById should return a restaurant from db', () => {
    repository.getById.mockResolvedValue(fakeProduct1);

    expect(service.getById('1')).resolves.toEqual(fakeProduct1);
    expect(repository.getById).toHaveBeenCalledWith('1');
  });

  it('getPaginated should return a list of products from db with pagination metadata', async () => {
    repository.getPaginated.mockResolvedValue([fakeProduct1, fakeProduct2]);
    repository.count.mockResolvedValue(2);

    const res = await service.getPaginated('1', 1, 2);
    expect(res).toEqual({
      products: [fakeProduct1, fakeProduct2],
      count: 2,
      page: 1,
      pageSize: 2,
      totalPages: 1,
    });
    expect(repository.getPaginated).toHaveBeenCalledWith('1', 1, 2);
    expect(repository.count).toHaveBeenCalledWith('1');
  });
});
