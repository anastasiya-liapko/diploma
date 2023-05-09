import {
  Controller,
  Get,
  Logger,
  UseGuards,
  Request,
  Put,
  Body,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BasicAuthGuard } from 'src/guards/basic-auth.guard';
import { GetAddressResponseDto } from './dto/get-addresses.response.dto';
import { PutAddressRequestDto } from './dto/put-addresses.request.dto';

@ApiTags('Addresses')
@ApiBearerAuth()
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) { }

  @Get('/')
  @ApiOperation({ summary: 'Получение адресов' })
  @ApiOkResponse({
    description: 'Список адресов',
    type: [GetAddressResponseDto],
  })
  @UseGuards(BasicAuthGuard, JwtAuthGuard)
  async get(@Request() req): Promise<GetAddressResponseDto[]> {
    try {
      return await this.addressesService.get(req.user);
    } catch (e) {
      Logger.error(
        `ADDRESSES GET -- ERROR: ${e.response ? JSON.stringify(e.response) : e
        }`,
      );
      throw e;
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Добавление адреса' })
  @ApiBody({
    type: PutAddressRequestDto,
  })
  @ApiOkResponse({
    description: 'Добавление адреса',
    type: GetAddressResponseDto,
  })
  @UseGuards(BasicAuthGuard, JwtAuthGuard)
  async patch(
    @Request() req,
    @Body() dto: PutAddressRequestDto,
  ): Promise<GetAddressResponseDto> {
    try {
      return await this.addressesService.put(req.user, dto);
    } catch (e) {
      Logger.error(
        `ADDRESSES PUT -- ERROR: ${e.response ? JSON.stringify(e.response) : e
        }`,
      );
      throw e;
    }
  }
}
