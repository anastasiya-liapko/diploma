import { ApiProperty } from '@nestjs/swagger';
import { GetAddressResponseDto } from 'src/modules/addresses/dto/get-addresses.response.dto';
import { CartGoodDto } from 'src/modules/cart/dto/get-cart.response.dto';

export class PostOrderResponseDto {
  @ApiProperty()
  _id: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: GetAddressResponseDto })
  address: GetAddressResponseDto;

  @ApiProperty()
  delivery_type: string;

  @ApiProperty({ type: [CartGoodDto] })
  goods: CartGoodDto[];

  @ApiProperty()
  total_price: number;
}
