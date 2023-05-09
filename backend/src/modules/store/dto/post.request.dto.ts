import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { PutAddressRequestDto } from 'src/modules/addresses/dto/put-addresses.request.dto';

export class PostStoreRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [PutAddressRequestDto] })
  addresses: PutAddressRequestDto[];
}
