import { ApiProperty } from '@nestjs/swagger';

export class getCategoryResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;
}
