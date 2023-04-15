import { Controller, Get, Logger } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GoodsService } from './goods.service';

@ApiTags('Goods')
@ApiBearerAuth()
@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}
}
