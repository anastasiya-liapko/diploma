import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { IsOptional } from 'class-validator';

export class EditLoyaltyUserDto {
  @ApiProperty()
  _id: Schema.Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  club: Schema.Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  login?: string;

  @ApiProperty()
  @IsOptional()
  password?: string;
}
