import { ApiProperty } from '@nestjs/swagger';

export class uploadResponseDto {
  @ApiProperty()
  status: 'ok';
}
