import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //   @Post('add')
  //   @Modules([{ name: 'Users', permission: ModulePermission.WRITE }])
  //   @UseGuards(JwtAuthGuard, ModulesGuard)
  //   @ApiOperation({ summary: 'Создание пользователя' })
  //   async createUser(@Request() req, @Body() dto: CreateUserDto) {
  //     try {
  //       return this.userService.create(dto);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
}
