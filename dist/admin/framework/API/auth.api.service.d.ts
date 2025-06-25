import { OnApplicationBootstrap } from '@nestjs/common';
import { IEvent } from 'app/abstract/generic.event';
import { ICreateAdminDTO } from 'src/admin/app/dto';
declare class GenericAuthAPI {
    private axiosAdapter;
    private _apiUrl;
    private _admin;
    private API_HEADERS;
    signin(data: ICreateAdminDTO): Promise<any>;
    addAccess(rules: any): Promise<any>;
    tokenLogin(token: string, permission?: string): Promise<{
        id: string;
        firstname: string;
        lastname: string;
        address: string;
        phone: string;
        email: string;
        isActivated: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export declare class AuthAPIService implements OnApplicationBootstrap {
    api: GenericAuthAPI;
    event: IEvent;
    onApplicationBootstrap(): void;
}
export {};
