import { ApiProperty } from '@nestjs/swagger';

export class GetAddressResponseDto {
  @ApiProperty()
  _id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  apartment: string;

  @ApiProperty()
  index: number;
}
