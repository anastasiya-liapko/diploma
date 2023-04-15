import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ModulePermission } from '../user.interface';

export class ModulePermissionValidationPipe implements PipeTransform {
  readonly allowedPermissions = [ModulePermission.READ, ModulePermission.WRITE];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isPermissionValid(value)) {
      throw new BadRequestException(`${value} is an invalid permission`);
    }

    return value;
  }

  private isPermissionValid(permission: any) {
    const idx = this.allowedPermissions.indexOf(permission);
    return idx !== -1;
  }
}
