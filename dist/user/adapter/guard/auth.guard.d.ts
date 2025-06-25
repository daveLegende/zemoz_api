import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IUserRepository } from '../../domain/data.abstract';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
export declare const _extractTokenFromHeader: (request: Request) => string | undefined;
export declare class UserGuard implements CanActivate {
    private dataServices;
    private authAPIServices;
    private reflector;
    constructor(dataServices: IUserRepository, authAPIServices: AuthAPIService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
