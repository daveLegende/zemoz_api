export declare class AdminAccountDto {
    nom?: string;
    email: string;
    password: string;
}
declare const UpdateAdminDTO_base: import("@nestjs/common").Type<Partial<AdminAccountDto>>;
export declare class UpdateAdminDTO extends UpdateAdminDTO_base {
    id: string;
}
export {};
