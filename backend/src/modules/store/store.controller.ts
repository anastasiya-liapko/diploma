import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
} from '@nestjs/swagger';
import { StoreService } from './store.service';
import { BasicAuthGuard } from 'src/guards/basic-auth.guard';
import { PostStoreRequestDto } from './dto/post.request.dto';
import { PostStoreResponseDto } from './dto/post.response.dto';
import { GetStoreResponseDto } from './dto/get.response.dto';

@ApiTags('Store')
@ApiBearerAuth()
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) { }

  @Get('/')
  @UseGuards(BasicAuthGuard)
  @ApiOperation({
    summary: 'Получение информации о магазине',
  })
  @ApiOkResponse({
    description: 'Магазин',
    type: GetStoreResponseDto,
  })
  async get(@Request() req): Promise<GetStoreResponseDto> {
    try {
      return await this.storeService.get();
    } catch (e) {
      throw e;
    }
  }

  @Post('/')
  @UseGuards(BasicAuthGuard)
  @ApiOperation({
    summary: 'Добавление магазина',
  })
  @ApiBody({
    type: PostStoreRequestDto,
  })
  @ApiOkResponse({
    description: 'Магазин добавлен',
    type: PostStoreResponseDto,
  })
  async post(
    @Request() req,
    @Body() dto: PostStoreRequestDto,
  ): Promise<PostStoreResponseDto> {
    try {
      return await this.storeService.post(dto);
    } catch (e) {
      throw e;
    }
  }
}
