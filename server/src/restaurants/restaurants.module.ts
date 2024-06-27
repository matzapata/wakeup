import { Module } from '@nestjs/common';
import { RestaurantsService } from '@src/restaurants/services/restaurants.service';
import { RestaurantsRepository } from './repositories/restaurants.respository';
import { PrismaModule } from '@src/database/prisma.module';

@Module({
  controllers: [],
  imports: [PrismaModule],
  providers: [RestaurantsService, RestaurantsRepository],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
