import { ApiProperty } from '@nestjs/swagger';

export class searchOneResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageLink: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  size: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  manufacturer: string;
}
