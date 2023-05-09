import { ApiProperty } from '@nestjs/swagger';

export class PostOrderRequestDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  delivery_type: string;
}
