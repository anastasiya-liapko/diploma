import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { Reflector } from '@nestjs/core';
import { ModulePermission, Module } from '../modules/user/user.interface';

@Injectable()
export class ModulesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  // возвращает true, если есть доступ хотя бы к одному из переданных модулей
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // const modules = this.reflector.get<Module[]>(
    //   'modules',
    //   context.getHandler(),
    // );
    // const user = await this.userService.getModules(request.user.id);
    // let permission = false;
    // if (!user.modules.length) {
    //   permission = true;
    // } else {
    //   modules.some((el) => {
    //     const found = user.modules.find((module) => el.name === module.name);
    //     if (
    //       found &&
    //       [ModulePermission.WRITE, el.permission].includes(found.permission)
    //     ) {
    //       permission = true;
    //       return true;
    //     }
    //   });
    // }
    // return permission;
    return true;
  }
}
