import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshUserDto } from './dto/refresh-user.dto';

@Injectable()
export class AuthService {
  // constructor(
  //   private userService: UserService,
  //   private jwtService: JwtService,
  // ) {}
  // async validateUser(login: string, password: string): Promise<any> {
  //   const user = await this.userService.checkUserCreds(login, password);
  //   if (user) {
  //     delete user.password;
  //     return user;
  //   }
  //   return null;
  // }
  // verifyUser(token): object {
  //   return this.jwtService.verify(token);
  // }
  // async login(user: any) {
  //   const payload = {
  //     _id: user._id,
  //     login: user.login,
  //     name: user.name,
  //   };
  //   const refresh = await this.userService.setRefresh(user._id);
  //   return {
  //     token: this.jwtService.sign(payload),
  //     refreshToken: refresh.refresh,
  //   };
  // }
  // async logout(user: any) {
  //   return await this.userService.removeRefresh(user.login);
  // }
  // async refresh(dto: RefreshUserDto) {
  //   const user = await this.userService.checkRefresh(dto);
  //   if (user) {
  //     return await this.login(user);
  //   } else {
  //     throw new UnauthorizedException('Bad token');
  //   }
  // }
}
