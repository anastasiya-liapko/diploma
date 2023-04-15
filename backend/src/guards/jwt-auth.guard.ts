import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    if (!user && info && info.name === 'TokenExpiredError') {
      throw new HttpException('jwt expired', HttpStatus.UNAUTHORIZED);
    } else if (!user) {
      throw new HttpException('jwt invalid', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
