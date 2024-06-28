import { Module, ValidationPipe } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_PIPE } from '@nestjs/core';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsController } from './controllers/restaurants.controller';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        DATABASE_URL_NON_POOLING: Joi.string().required(),
        ADMIN_SECRET: Joi.string().required(),
      }),
    }),
    RestaurantsModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [RestaurantsController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
