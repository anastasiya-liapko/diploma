import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
} from 'class-validator';
import { ModulePermission } from '../user.interface';
import { Schema } from 'mongoose';

class ModuleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsIn([ModulePermission.READ, ModulePermission.WRITE])
  permission: ModulePermission;
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

export class EditUserDto {
  @ApiProperty()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  login: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsOptional()
  modules: ModuleDto[] = [];

  @ApiProperty()
  @IsOptional()
  structure: StructureDto[] = [];

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment?: string;
}
