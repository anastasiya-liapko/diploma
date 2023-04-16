import { ApiProperty } from '@nestjs/swagger';

export class UploadRequestDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
