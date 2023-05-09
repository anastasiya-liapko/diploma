import { ApiProperty } from '@nestjs/swagger';
import { GoodDto } from 'src/modules/goods/dto/good.dto';
import { Good } from 'src/modules/goods/good.interface';

export class CartGoodDto {
  @ApiProperty({ type: GoodDto })
  good: GoodDto;

  @ApiProperty()
  count: number;
}

export class GetCartResponseDto {
  @ApiProperty({ type: [CartGoodDto] })
  goods: CartGoodDto[];

  @ApiProperty()
  total_price: number;
}
