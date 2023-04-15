import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class DemoUserDto {
  @ApiProperty()
  @IsArray()
  modules: object[];

  @ApiProperty()
  @IsArray()
  structure: object[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name = 'Demo User';

  @ApiProperty()
  @IsBoolean()
  BMSAdmin = false;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsBoolean()
  demoUser = true;
}
