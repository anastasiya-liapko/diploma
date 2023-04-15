import { Controller, Get, Logger } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { getCatalogResponseDto } from './dto/get-catalog-response.dto';

@ApiTags('Catalog')
@ApiBearerAuth()
@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  //   @Get()
  //   @ApiOperation({ summary: 'Получение каталога сертификатов' })
  //   @ApiOkResponse({
  //     description: 'Каталог сертификатов',
  //     type: [getCatalogResponseDto],
  //   })
  //   async get() {
  //     try {
  //       return await this.catalogService.get();
  //     } catch (e) {
  //       Logger.error(
  //         `GET CATALOG -- ERROR: ${e.response ? JSON.stringify(e.response) : e}`,
  //       );
  //       throw e;
  //     }
  //   }
}
