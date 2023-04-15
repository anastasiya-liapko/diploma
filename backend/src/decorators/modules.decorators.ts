import { SetMetadata } from '@nestjs/common';
import { Module } from 'src/modules/user/user.interface';

export const Modules = (modules: Module[]) => SetMetadata('modules', modules);
