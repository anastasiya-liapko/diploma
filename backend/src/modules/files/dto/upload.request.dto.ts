import { ApiProperty } from '@nestjs/swagger';

export class uploadRequestDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
