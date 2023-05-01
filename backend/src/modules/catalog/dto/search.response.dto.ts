import { ApiProperty } from '@nestjs/swagger';
import { searchOneResponseDto } from './searchOne.response.dto';

export class searchResponseDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  totalElements: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty({ type: [searchOneResponseDto] })
  data: searchOneResponseDto[];
}
