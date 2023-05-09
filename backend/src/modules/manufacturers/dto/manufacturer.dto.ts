import { ApiProperty } from '@nestjs/swagger';

export class ManufacturerDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageLink: string;

  @ApiProperty()
  siteLink: string;
}
