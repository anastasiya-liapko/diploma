import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { getCategoryResponseDto } from 'src/modules/categories/dto/get.response.dto';
import { ManufacturerDto } from 'src/modules/manufacturers/dto/manufacturer.dto';

export class GoodDto {
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

  @ApiProperty({ type: getCategoryResponseDto })
  category: getCategoryResponseDto;

  @ApiProperty({ type: ManufacturerDto })
  manufacturer: ManufacturerDto;
}
