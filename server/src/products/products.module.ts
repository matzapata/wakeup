import { Module } from '@nestjs/common';
import { ProductsService } from '@src/products/services/products.service';

@Module({
  controllers: [],
  providers: [ProductsService],
})
export class ProductsModule {}
