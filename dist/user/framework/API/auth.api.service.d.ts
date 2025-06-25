import { OnApplicationBootstrap } from '@nestjs/common';
import { IEvent } from 'app/abstract/generic.event';
import { ISigninUserDTO } from 'user/app/dto';
declare class GenericAuthAPI {
    private axiosAdapter;
    private _apiUrl;
    private _user;
    private API_HEADERS;
    signin(data: ISigninUserDTO): Promise<any>;
    addAccess(rules: any): Promise<any>;
    tokenLogin(token: string, permission?: string): Promise<any>;
}
export declare class AuthAPIService implements OnApplicationBootstrap {
    api: GenericAuthAPI;
    event: IEvent;
    onApplicationBootstrap(): void;
}
export {};
