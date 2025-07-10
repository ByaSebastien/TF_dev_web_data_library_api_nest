import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    if(!context.switchToHttp().getRequest().session) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
