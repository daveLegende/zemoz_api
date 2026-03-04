import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IAdminRepository } from 'src/admin/domain';
import { AuthAPIService } from 'src/admin/framework/API/auth.api.service';
import { AccessEnum } from '../../../user/domain/user.enum';

export const _extractTokenFromHeader = (
  request: Request,
): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private dataServices: IAdminRepository,
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
      const admin = await this.authAPIServices.api.tokenLogin(token, permission);
      if (admin) {
        const account = await this.dataServices.admins.findOneBy({
          email: admin.email,
        });
        if (account) request['admin'] = account;
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
