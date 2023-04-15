import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
