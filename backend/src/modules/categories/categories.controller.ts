import { Controller, Get, Logger } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { getResponseDto } from './dto/get.response.dto';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  @ApiOperation({ summary: 'Получение списка категорий' })
  @ApiOkResponse({
    description: 'Список категорий',
    type: [getResponseDto],
  })
  async get(): Promise<getResponseDto[]> {
    try {
      return await this.categoriesService.get();
    } catch (e) {
      Logger.error(
        `CATEGORIES GET -- ERROR: ${
          e.response ? JSON.stringify(e.response) : e
        }`,
      );
      throw e;
    }
  }
}
