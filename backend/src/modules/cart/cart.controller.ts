import { Controller, Get, Logger, UseGuards, Request } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BasicAuthGuard } from 'src/guards/basic-auth.guard';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) { }

  @Get('/')
  @ApiOperation({ summary: 'Получение корзины' })
  // @ApiOkResponse({
  //   description: 'Товар',
  //   type: searchOneResponseDto,
  // })
  @UseGuards(BasicAuthGuard, JwtAuthGuard)
  async get(@Request() req): Promise<any> {
    console.log(req.user);
    // try {
    //   return await this.catalogService.searchOne(id);
    // } catch (e) {
    //   Logger.error(
    //     `CATALOG SEARCH ONE -- ERROR: ${e.response ? JSON.stringify(e.response) : e
    //     }`,
    //   );
    //   throw e;
  }
}
