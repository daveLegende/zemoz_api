import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AccessEnum } from '../../domain';
import { IUserRepository } from '../../domain/data.abstract';
// import { IAuthAPIDataServices } from 'user/app/abstract';
import { AuthAPIService } from '../../framework/API/auth.api.service';

export const _extractTokenFromHeader = (
  request: Request,
): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private dataServices: IUserRepository,
    private authAPIServices: AuthAPIService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    const permission = this.reflector.getAllAndOverride<AccessEnum>(
      'permission',
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = _extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.authAPIServices.api.tokenLogin(token, permission);
      if (user) {
        const account = await this.dataServices.users.findOneBy({
          email: user.email,
          phone: user.phone,
        });
        if (account) request['user'] = account;
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
