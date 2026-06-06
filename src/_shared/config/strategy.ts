import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IUserRepository } from '../../user/domain/data.abstract';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userRepository: IUserRepository, // Injecter le UserRepository pour vérifier l'utilisateur
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Utilisation de la variable d'environnement
    });
  }

  async validate(payload: any) {
    console.log('Validating JWT...', payload);
    console.log('User found:');
    // Rechercher l'utilisateur dans la base de données en fonction de son ID

    const user = await this.userRepository.users.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Vous pouvez ajouter des vérifications supplémentaires, comme si l'utilisateur est actif
    if (!user.isActivated) {
      throw new UnauthorizedException('User is inactive');
    }
    console.log(user);

    return user; // Retourner l'utilisateur authentifié
  }
}
