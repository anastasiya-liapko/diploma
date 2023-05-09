import { ApiProperty } from '@nestjs/swagger';
import { GetAddressResponseDto } from 'src/modules/addresses/dto/get-addresses.response.dto';
import { CartGoodDto } from 'src/modules/cart/dto/get-cart.response.dto';
import { Good } from 'src/modules/goods/good.interface';

export class PostOrderResponseDto {
  @ApiProperty({ type: GetAddressResponseDto })
  address: GetAddressResponseDto;

  @ApiProperty()
  delivery_type: string;

  @ApiProperty({ type: [CartGoodDto] })
  goods: CartGoodDto[];

  @ApiProperty()
  status: string;

  @ApiProperty()
  total_price: number;
}
