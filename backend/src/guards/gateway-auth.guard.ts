import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GatewayAuthGuard extends AuthGuard('WsStrategy') {
  handleRequest(err, user, info: Error, context) {
    if (!user && info && info.name === 'TokenExpiredError') {
      return {
        user,
        status: 'error',
        error: 'jwt expired',
        data: context.args[1],
      };
    } else if (!user) {
      return {
        user,
        status: 'error',
        error: 'jwt invalid',
        data: context.args[1],
      };
    }
    return user;
  }
}
