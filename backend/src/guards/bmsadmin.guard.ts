import {
  CanActivate,
  Injectable,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class BMSAdminGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // return await this.userService.checkBMSAdmin(request.user.id);
    return true;
  }
}
