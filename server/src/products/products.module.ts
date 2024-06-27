import { Module } from '@nestjs/common';
import { ProductsService } from '@src/products/services/products.service';
import { ProductsRepository } from './repositories/products.repository';
import { PrismaModule } from '@src/database/prisma.module';

@Module({
  controllers: [],
  imports: [PrismaModule],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
