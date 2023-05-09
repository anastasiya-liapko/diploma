import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class BasicAuthGuard extends AuthGuard('basic') {
  async canActivate(context: ExecutionContext) {
    const authHeader = context.switchToHttp().getRequest()
      .headers.authorizationbasic;

    // if (!authHeader) {
    //   return false;
    // } else {
    //   const basic = authHeader.split(',').find((el) => el.includes('Basic'));
    //   if (!basic) return false;
    //   const auth = Buffer.from(basic.trim().split(' ')[1], 'base64')
    //     .toString()
    //     .split(':');
    //   const username = auth[0];
    //   const password = auth[1];

    //   if (
    //     username === process.env.BASIC_USERNAME &&
    //     password === process.env.BASIC_PASSWORD
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    return true;
  }
}
