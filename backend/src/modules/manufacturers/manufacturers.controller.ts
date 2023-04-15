import { Controller, Get, Logger } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ManufacturersService } from './manufacturers.service';

@ApiTags('Manufacturers')
@ApiBearerAuth()
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private manufacturersService: ManufacturersService) {}
}
