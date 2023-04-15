import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

function extractToken(req) {
  console.log('req', req);
}

@Injectable()
export class WsStrategy extends PassportStrategy(Strategy, 'WsStrategy') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        return req.handshake.query.auth;
      },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { id: payload._id, email: payload.email, name: payload.name };
  }
}
