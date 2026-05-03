import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;

    if (!auth) return false;

    const token = auth.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}