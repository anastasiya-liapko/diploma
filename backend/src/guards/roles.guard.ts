import {
  CanActivate,
  Injectable,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private static matchRoles(roles, userRole) {
    return roles.some((role: string) => {
      return role === userRole;
    });
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return RolesGuard.matchRoles(roles, user.role);
  }
}
