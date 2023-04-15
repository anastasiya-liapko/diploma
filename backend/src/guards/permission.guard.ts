import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { Reflector } from '@nestjs/core';
// TODO: Дописать проверку на массив точек, сетей
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private userService: UserService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // const structure = this.reflector.get<string>(
    //   'structure',
    //   context.getHandler(),
    // );
    // const user = await this.userService.getStructure(request.user.id);
    // const club = request.club;

    // let permission = false;

    // permission = true;

    // if (!user.structure.length) {
    //   // Разрешен доступ ко всей структуре
    //   permission = true;
    // } else {
    //   user.structure.forEach((item) => {
    //     if (item.club.toString() === club._id.toString()) {
    //       permission = true;
    //       // Доступ к клубу разрешен
    //     }
    //   });
    // }

    // return permission;
    return true;
  }
}
