import {
  Controller,
  Get,
  Logger,
  UseGuards,
  Request,
  Patch,
  Body,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BasicAuthGuard } from 'src/guards/basic-auth.guard';
import { GetCartResponseDto } from './dto/get-cart.response.dto';
import { PatchCartRequestDto } from './dto/patch-cart.request.dto';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) { }

  @Get('/')
  @ApiOperation({ summary: 'Получение корзины' })
  @ApiOkResponse({
    description: 'Корзина',
    type: GetCartResponseDto,
  })
  @UseGuards(BasicAuthGuard, JwtAuthGuard)
  async get(@Request() req): Promise<GetCartResponseDto> {
    try {
      return await this.cartService.get(req.user);
    } catch (e) {
      Logger.error(
        `CART GET -- ERROR: ${e.response ? JSON.stringify(e.response) : e}`,
      );
      throw e;
    }
  }

  @Patch('/')
  @ApiOperation({ summary: 'Изменение корзины' })
  @ApiBody({
    type: PatchCartRequestDto,
  })
  @ApiOkResponse({
    description: 'Корзина',
    type: GetCartResponseDto,
  })
  @UseGuards(BasicAuthGuard, JwtAuthGuard)
  async patch(
    @Request() req,
    @Body() dto: PatchCartRequestDto,
  ): Promise<GetCartResponseDto> {
    try {
      return await this.cartService.patch(req.user, dto);
    } catch (e) {
      Logger.error(
        `CART PATCH -- ERROR: ${e.response ? JSON.stringify(e.response) : e}`,
      );
      throw e;
    }
  }
}
