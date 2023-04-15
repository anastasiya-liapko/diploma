import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
      passReqToCallback: false,
    });
  }

  async validate(login: string, password: string): Promise<any> {
    // const user = await this.authService.validateUser(login, password);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
  }
}
