import {
  Controller,
  Get,
  Logger,
  UseGuards,
  Request,
  Patch,
  Body,
  Post,
  Query,
  Param,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { PostOrderRequestDto } from './dto/post.resuest.dto';
import { BasicAuthGuard } from 'src/guards/basic-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PostOrderResponseDto } from './dto/post.response.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск заказа' })
  @ApiOkResponse({
    description: 'Заказ',
    type: PostOrderResponseDto,
  })
  @UseGuards(BasicAuthGuard, JwtAuthGuard)
  async get(
    @Request() req,
    @Param('id') id: string,
  ): Promise<PostOrderResponseDto> {
    try {
      return await this.ordersService.getById(req.user, id);
    } catch (e) {
      Logger.error(
        `ORDER GET -- ERROR: ${e.response ? JSON.stringify(e.response) : e}`,
      );
      throw e;
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Создание заказа' })
  @ApiBody({
    type: PostOrderRequestDto,
  })
  @ApiOkResponse({
    description: 'Созданный заказ',
    type: PostOrderResponseDto,
  })
  @UseGuards(BasicAuthGuard, JwtAuthGuard)
  async patch(
    @Request() req,
    @Body() dto: PostOrderRequestDto,
  ): Promise<PostOrderResponseDto> {
    try {
      return await this.ordersService.post(req.user, dto);
    } catch (e) {
      Logger.error(
        `ORDER POST -- ERROR: ${e.response ? JSON.stringify(e.response) : e}`,
      );
      throw e;
    }
  }
}
