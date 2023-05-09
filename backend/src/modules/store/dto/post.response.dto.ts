import { ApiProperty } from '@nestjs/swagger';

export class PostStoreResponseDto {
  @ApiProperty()
  status: 'ok';
}
