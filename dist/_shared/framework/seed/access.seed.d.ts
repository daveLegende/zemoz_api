import { AuthAPIService } from 'user/framework/API/auth.api.service';
export declare class AccessSeed {
    private readonly authAPIService;
    constructor(authAPIService: AuthAPIService);
    create(): Promise<void>;
}
