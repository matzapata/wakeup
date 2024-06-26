import { Module } from '@nestjs/common';
import { RestaurantsService } from '@src/restaurants/services/restaurants.service';

@Module({
  controllers: [],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
