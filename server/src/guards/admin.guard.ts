import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const ADMIN_SECRET = this.configService.getOrThrow<string>('ADMIN_SECRET');
    const adminSecretHeader = req.headers['admin-secret'];

    if (!adminSecretHeader || adminSecretHeader !== ADMIN_SECRET) {
      throw new UnauthorizedException('Invalid or missing Admin-Secret header');
    }

    return true;
  }
}
