import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AccessEnum } from '../../domain';
import { IUserRepository } from '../../domain/data.abstract';
import { JwtService } from '@nestjs/jwt';

export const _extractTokenFromHeader = (
  request: Request,
): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

@Injectable()
export class UserGuard implements CanActivate {
  private readonly logger = new Logger(UserGuard.name);

  constructor(
    private dataServices: IUserRepository,
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = _extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }
    
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const user = await this.dataServices.users.findOneBy({ id: decoded.sub });
      
      if (!user) {
        throw new UnauthorizedException('Utilisateur introuvable');
      }
      
      request['user'] = user;
      return true;
    } catch (error) {
      this.logger.warn(`Auth failed: ${error.message}`);
      throw new UnauthorizedException(error.message);
    }
  }
}

