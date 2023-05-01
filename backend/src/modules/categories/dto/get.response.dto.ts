import { ApiProperty } from '@nestjs/swagger';

export class getResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;
}
