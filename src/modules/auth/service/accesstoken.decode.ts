import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH0_JWKSURI!,
      }),
      audience: process.env.AUTH0_AUDIENCE!,
      issuer: process.env.AUTH0_ISSUER!,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    console.log("yes")
    if(!payload){
      console.log("no")
      throw new UnauthorizedException()
    }
    return payload;
  }
}

