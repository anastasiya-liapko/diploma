import {
  Controller,
  Request,
  Post,
  UseGuards,
  Logger,
  Body,
  Response,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Request() req, @Body() dto: AuthUserDto) {
    try {
      return this.authService.register(dto);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res, @Body() dto: AuthUserDto) {
    try {
      res.send(await this.authService.login(req.user));
    } catch (e) {
      throw e;
    }
  }

  @Post('logout')
  async logout(@Request() req, @Body() user: any) {
    try {
      return this.authService.logout(user);
    } catch (e) {
      throw e;
    }
  }

  @Post('refresh')
  async refresh(@Request() res, @Body() refreshUserDto: RefreshUserDto) {
    try {
      return this.authService.refresh(refreshUserDto);
    } catch (e) {
      throw e;
    }
  }
}
