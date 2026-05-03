import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;

    if (!auth) throw new UnauthorizedException();

    const token = auth.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
