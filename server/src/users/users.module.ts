import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';

@Module({
  controllers: [],
  providers: [UsersService],
})
export class UsersModule {}
