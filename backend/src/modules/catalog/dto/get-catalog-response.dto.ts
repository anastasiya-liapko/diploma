import { ApiProperty } from '@nestjs/swagger';

export class getCatalogResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string[];

  @ApiProperty()
  nominal: number;

  @ApiProperty()
  product_code: string;

  @ApiProperty()
  retail_point_id: number;
}
