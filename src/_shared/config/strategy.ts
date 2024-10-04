import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    //   Mieux d'utiliser une variable d'enviromement
      secretOrKey: configService.get('JWT_SECRET'), 
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}