import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshUserResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;
}
