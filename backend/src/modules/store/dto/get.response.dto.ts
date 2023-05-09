import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { GetAddressResponseDto } from 'src/modules/addresses/dto/get-addresses.response.dto';
import { PutAddressRequestDto } from 'src/modules/addresses/dto/put-addresses.request.dto';

export class GetStoreResponseDto {
  @ApiProperty()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [GetAddressResponseDto] })
  addresses: GetAddressResponseDto[];
}
