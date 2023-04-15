import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Logger,
  Patch,
  Delete,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ModulesGuard } from '../../guards/modules.guard';
import { Modules } from '../../decorators/modules.decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';
import { SearchUsersQueryDto } from './dto/search-users-query.dto';
import { ModulePermission } from './user.interface';
import { BasicAuthGuard } from '../../guards/basic-auth.guard';
import { CreateDemoUserDto } from './dto/create-demo-user.dto';
import { EditLoyaltyUserDto } from './dto/edit-loyalty-user.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  //   constructor(
  //     private userService: UserService,
  //     private clubService: ClubService,
  //     private remoteService: RemoteService,
  //   ) {}
  //   @Get('profile')
  //   @UseGuards(JwtAuthGuard)
  //   @ApiOperation({ summary: 'Получение информации о пользователе' })
  //   async getProfile(@Request() req) {
  //     try {
  //       return await this.userService.profile(req.user.id);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  //   @Post('search')
  //   @Modules([{ name: 'Users', permission: ModulePermission.READ }])
  //   @UseGuards(JwtAuthGuard, ModulesGuard)
  //   @ApiQuery({
  //     name: 'page',
  //     required: true,
  //     type: Number,
  //   })
  //   @ApiQuery({
  //     name: 'limit',
  //     required: true,
  //     type: Number,
  //   })
  //   @ApiOperation({ summary: 'Поиск пользователей' })
  //   async searchUsers(
  //     @Request() req,
  //     @Body() dto: SearchUsersDto,
  //     @Query() query: SearchUsersQueryDto,
  //   ) {
  //     try {
  //       return this.userService.search(req.user.login, dto, query);
  //     } catch (e) {
  //       console.log(e);
  //       throw e;
  //     }
  //   }
  //   @Get('search/:login')
  //   @Modules([
  //     // TODO: добавить модули, где необходим поиск юзера по логину
  //     { name: 'Users', permission: ModulePermission.WRITE },
  //   ])
  //   @UseGuards(JwtAuthGuard, ModulesGuard)
  //   @ApiOperation({ summary: 'Поиск пользователя' })
  //   async searchOne(@Request() req, @Param('login') login: string) {
  //     try {
  //       return await this.userService.searchOne(req.user.login, login);
  //     } catch (e) {
  //       console.log(e);
  //       throw e;
  //     }
  //   }
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
  //   @Post('add/demo')
  //   @UseGuards(BasicAuthGuard)
  //   @ApiOperation({ summary: 'Создание демо-пользователя' })
  //   async createDemoUser(@Request() req, @Body() dto: CreateDemoUserDto) {
  //     try {
  //       return this.userService.createDemo(dto);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  //   @Patch('edit')
  //   @Modules([{ name: 'Users', permission: ModulePermission.WRITE }])
  //   @UseGuards(JwtAuthGuard, ModulesGuard)
  //   @ApiOperation({ summary: 'Редактирование пользователя' })
  //   async editUser(@Request() req, @Body() dto: EditUserDto) {
  //     try {
  //       return await this.userService.edit(dto);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  //   @Patch('edit/demo')
  //   @UseGuards(BasicAuthGuard)
  //   @ApiOperation({ summary: 'Редактирование демо-пользователя из лояльности' })
  //   async editLoyaltyUser(@Body() dto: EditLoyaltyUserDto) {
  //     try {
  //       return await this.userService.editLoyaltyUser(dto);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  //   @Delete('remove')
  //   @Modules([{ name: 'Users', permission: ModulePermission.WRITE }])
  //   @UseGuards(JwtAuthGuard, ModulesGuard)
  //   @ApiOperation({ summary: 'Удаление пользователя' })
  //   async removeUser(@Request() res, @Body() dto: RemoveUserDto) {
  //     try {
  //       return this.userService.remove(dto);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  //   @Get('available/retails/:clubId')
  //   @Modules([
  //     { name: 'Users', permission: ModulePermission.WRITE },
  //     { name: 'ClubTransactions', permission: ModulePermission.READ },
  //     { name: 'ClubNews', permission: ModulePermission.READ },
  //     { name: 'ClubPush', permission: ModulePermission.WRITE },
  //     { name: 'ClubPromotions', permission: ModulePermission.READ },
  //     { name: 'ClubReports', permission: ModulePermission.READ },
  //     { name: 'ClubStructure', permission: ModulePermission.READ },
  //   ])
  //   @UseGuards(JwtAuthGuard, ModulesGuard, ClubsGuard)
  //   @ApiOperation({ summary: 'Получение доступных сетей' })
  //   async getAvailableRetails(@Request() req, @Param('clubId') clubId: number) {
  //     try {
  //       return await this.userService.getAvailableRetails(req.user.id, req.club);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  //   @Get('available/points/:clubId')
  //   @Modules([
  //     { name: 'Users', permission: ModulePermission.WRITE },
  //     { name: 'ClubTransactions', permission: ModulePermission.READ },
  //     { name: 'ClubNews', permission: ModulePermission.READ },
  //     { name: 'ClubPush', permission: ModulePermission.WRITE },
  //     { name: 'ClubPromotions', permission: ModulePermission.READ },
  //     { name: 'ClubReports', permission: ModulePermission.READ },
  //     { name: 'ClubStructure', permission: ModulePermission.READ },
  //   ])
  //   @UseGuards(JwtAuthGuard, ModulesGuard, ClubsGuard)
  //   @ApiOperation({ summary: 'Получение доступных точек' })
  //   async getAvailablePoints(@Request() req, @Param('clubId') clubId: number) {
  //     try {
  //       return await this.userService.getAvailablePoints(req.user.id, req.club);
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
  //   @Get('available/juridical/:clubId')
  //   @Modules([
  //     { name: 'ClubReports', permission: ModulePermission.READ },
  //     { name: 'ClubSettings', permission: ModulePermission.READ },
  //     { name: 'ClubStructure', permission: ModulePermission.READ },
  //   ])
  //   @UseGuards(JwtAuthGuard, ModulesGuard, ClubsGuard)
  //   async getAvailableJuridical(@Request() req, @Param('clubId') clubId: number) {
  //     try {
  //       return await this.userService.getAvailableJuridicals(
  //         req.user.id,
  //         req.club,
  //       );
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
}
