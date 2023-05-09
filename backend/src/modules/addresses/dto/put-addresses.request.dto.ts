import { ApiProperty } from '@nestjs/swagger';

export class PutAddressRequestDto {
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