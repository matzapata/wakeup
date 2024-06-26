import { TestBed } from '@automock/jest';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsRepository } from '../repositories/restaurants.respository';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repository: jest.Mocked<RestaurantsRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(RestaurantsService).compile();

    service = unit;
    repository = unitRef.get(RestaurantsRepository);
  });

  it('create should create a restaurant in db and return it', () => {
    repository.create.mockResolvedValue({ id: '1', name: 'restaurant' });

    expect(service.create('restaurant')).resolves.toEqual({
      id: '1',
      name: 'restaurant',
    });
    expect(repository.create).toHaveBeenCalledWith('restaurant');
  });

  it('getById should return a restaurant from db', () => {
    repository.getById.mockResolvedValue({ id: '1', name: 'restaurant' });

    expect(service.getById('1')).resolves.toEqual({
      id: '1',
      name: 'restaurant',
    });
    expect(repository.getById).toHaveBeenCalledWith('1');
  });

  it('getPaginated should return a list of restaurants from db', async () => {
    repository.getPaginated.mockResolvedValue([
      { id: '1', name: 'restaurant1' },
      { id: '2', name: 'restaurant2' },
    ]);
    repository.count.mockResolvedValue(2);

    const res = await service.getPaginated(1, 2);
    expect(res).toEqual({
      restaurants: [
        { id: '1', name: 'restaurant1' },
        { id: '2', name: 'restaurant2' },
      ],
      count: 2,
      page: 1,
      pageSize: 2,
      totalPages: 1,
    });
    expect(repository.getPaginated).toHaveBeenCalledWith(1, 2);
    expect(repository.count).toHaveBeenCalled();
  });
});
