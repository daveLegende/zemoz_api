import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { IAccountRepository } from "../../account/domain/data.abstract";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private accountRepository: IAccountRepository, // IAccountRepository remplace IUserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // Rechercher le compte dans la base de données en fonction de son ID
    const account = await this.accountRepository.accounts.findOneBy({ id: payload.sub });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (!account.isActivated) {
      throw new UnauthorizedException('Account is inactive');
    }

    return account; // Retourner le compte authentifié
  }
}
