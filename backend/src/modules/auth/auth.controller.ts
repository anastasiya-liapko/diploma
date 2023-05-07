import {
  Controller,
  Request,
  Post,
  UseGuards,
  Logger,
  Body,
  Response,
} from '@nestjs/common';
import { AuthUserRequestDto } from './dto/authUser.request.dto';
import { AuthUserResponseDto } from './dto/authUser.response.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { RefreshUserRequestDto } from './dto/refreshUser.request.dto';
import { RefreshUserResponseDto } from './dto/refreshUser.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiOperation({
    summary: 'Регистрация пользователя',
  })
  @ApiBody({
    type: AuthUserRequestDto,
  })
  @ApiOkResponse({
    description: 'Пользователь зарегистрирован',
    type: AuthUserResponseDto,
  })
  async register(
    @Request() req,
    @Body() dto: AuthUserRequestDto,
  ): Promise<AuthUserResponseDto> {
    try {
      return this.authService.register(dto);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Авторизация пользователя',
  })
  @ApiBody({
    type: AuthUserRequestDto,
  })
  @ApiOkResponse({
    description: 'Пользователь авторизован',
    type: AuthUserResponseDto,
  })
  async login(
    @Request() req,
    @Response() res,
    @Body() dto: AuthUserRequestDto,
  ) {
    try {
      res.send(await this.authService.login(req.user));
    } catch (e) {
      throw e;
    }
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Обновление токенов пользователя',
  })
  @ApiBody({
    type: RefreshUserRequestDto,
  })
  @ApiOkResponse({
    description: 'Токены пользоватея обновлены',
    type: RefreshUserResponseDto,
  })
  async refresh(
    @Request() req,
    @Body() dto: RefreshUserRequestDto,
  ): Promise<RefreshUserResponseDto> {
    try {
      return await this.authService.refresh(dto);
    } catch (e) {
      throw e;
    }
  }

  @Post('logout')
  @ApiOperation({
    summary: 'Деавторизация пользователя',
  })
  @ApiBody({
    type: RefreshUserRequestDto,
  })
  @ApiOkResponse({
    description: 'Пользователь деавторизован',
    type: Boolean,
  })
  async logout(
    @Request() req,
    @Body() dto: RefreshUserRequestDto,
  ): Promise<boolean> {
    try {
      return await this.authService.logout(dto);
    } catch (e) {
      throw e;
    }
  }
}
