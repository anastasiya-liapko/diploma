// tslint:disable:max-classes-per-file
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsIn,
  IsBoolean,
} from 'class-validator';
import { ModulePermission } from '../user.interface';
import { Schema } from 'mongoose';

class ModuleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsIn([ModulePermission.READ, ModulePermission.WRITE])
  permission: string;
}

class RetailDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  points: number[];
}

class StructureDto {
  @ApiProperty()
  club: Schema.Types.ObjectId;

  @ApiProperty()
  retails: RetailDto[] = [];
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  modules: ModuleDto[] = [];

  @ApiProperty()
  @IsOptional()
  structure: StructureDto[] = [];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email = '';

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment?: string = '';

  refresh: string = null;

  @ApiProperty()
  @IsBoolean()
  demoUser = false;
}
