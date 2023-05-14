import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class GetAddressResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  apartment: string;
}
