import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IAdminRepository } from 'src/admin/domain';
import { AuthAPIService } from 'src/admin/framework/API/auth.api.service';
export declare const _extractTokenFromHeader: (request: Request) => string | undefined;
export declare class AdminGuard implements CanActivate {
    private dataServices;
    private authAPIServices;
    private reflector;
    constructor(dataServices: IAdminRepository, authAPIServices: AuthAPIService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
