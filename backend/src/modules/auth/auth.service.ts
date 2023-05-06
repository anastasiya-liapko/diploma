import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshUserRequestDto } from './dto/refreshUser.request.dto';
import { AuthUserRequestDto } from './dto/authUser.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  // verifyUser(token): object {
  //   return this.jwtService.verify(token);
  // }

  public async register(dto: AuthUserRequestDto) {
    const user = await this.userService.createUser(dto);

    return this.login(user);
  }

  public async login(user: any) {
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
    const found = await this.userService.getUser(user.email);
    if (!found) {
      throw new NotFoundException();
    }

    const refresh = await this.userService.setRefresh(user._id);

    return {
      token: this.jwtService.sign(payload),
      refreshToken: refresh.refresh,
    };
  }

  public async logout(user: any): Promise<boolean> {
    return await this.userService.removeRefresh(user.email);
  }

  public async refresh(dto: RefreshUserRequestDto) {
    const user = await this.userService.checkRefresh(dto);
    if (user) {
      return await this.login(user);
    } else {
      throw new UnauthorizedException('Bad token');
    }
  }

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.checkUserCreds(email, password);
    if (user) {
      delete user.password;
      return user;
    }
    return null;
  }
}
