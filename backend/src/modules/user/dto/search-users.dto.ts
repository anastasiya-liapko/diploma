import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class SearchUsersDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  query: string;

  @ApiProperty()
  @IsOptional()
  // @IsString()
  club: Schema.Types.ObjectId;
}
