import { ApiProperty } from '@nestjs/swagger';
import { Good } from 'src/modules/goods/good.interface';

export class CartGoodDto {
  @ApiProperty()
  good: Good;

  @ApiProperty()
  count: number;
}

export class GetCartResponseDto {
  @ApiProperty({ type: [CartGoodDto] })
  goods: CartGoodDto[];

  @ApiProperty()
  total_price: number;
}
