import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/public.decorator';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';
import { JwtStrategies } from './jwt.strategies';
import { JwtAuthPayload } from './interface/jwt-auth-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtStrategies: JwtStrategies,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.isPublic(context);

    if (isPublic) return true;

    const token = this.extractTokenFromHeader(request);

    const payload = await this.jwtStrategies.auth.verify(token);

    this.isEmailConfirmed(payload);

    request['user'] = payload;

    return true;
  }

  private isPublic(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic;
  }

  private isEmailConfirmed(payload: JwtAuthPayload): void {
    if (!payload.isEmailConfirmed) {
      throw AuthBusinessExceptions.emailNotVerifiedException();
    }
  }

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (!token || type !== 'Bearer')
      throw AuthBusinessExceptions.invalidTokenException();

    return token;
  }
}
