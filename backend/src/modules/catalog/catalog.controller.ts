import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { searchRequestDto } from './dto/search.request.dto';
import { searchResponseDto } from './dto/search.response.dto';
import { searchOneResponseDto } from './dto/searchOne.response.dto';
import { BasicAuthGuard } from 'src/guards/basic-auth.guard';

@ApiTags('Catalog')
@ApiBearerAuth()
@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) { }

  @Get('/search')
  @ApiOperation({ summary: 'Получение списка товаров' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page you want to retrieve (0..N)',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    description: 'Number of records per page',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description:
      'Sorting criteria in the format: property(,asc|desc). Multiple' +
      " sort criteria are not supported. Examples: 'name,ASC', 'name,DESC'",
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Searching criteria in the string format',
  })
  @ApiOkResponse({
    description: 'Список товаров',
    type: searchResponseDto,
  })
  @UseGuards(BasicAuthGuard)
  async search(
    @Request() req,
    @Query() dto: searchRequestDto,
  ): Promise<searchResponseDto> {
    try {
      return await this.catalogService.search(dto);
    } catch (e) {
      Logger.error(
        `CATALOG SEARCH -- ERROR: ${e.response ? JSON.stringify(e.response) : e
        }`,
      );
      throw e;
    }
  }

  @Get('/search/:id')
  @ApiOperation({ summary: 'Получение товара по айди' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: 'Товар',
    type: searchOneResponseDto,
  })
  @UseGuards(BasicAuthGuard)
  async searchOne(
    @Request() req,
    @Param('id') id: number,
  ): Promise<searchOneResponseDto> {
    try {
      return await this.catalogService.searchOne(id);
    } catch (e) {
      Logger.error(
        `CATALOG SEARCH ONE -- ERROR: ${e.response ? JSON.stringify(e.response) : e
        }`,
      );
      throw e;
    }
  }
}
