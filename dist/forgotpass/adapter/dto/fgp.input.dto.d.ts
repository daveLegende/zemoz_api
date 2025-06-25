export declare class ForgotPassAccountDto {
    code: string;
    email: string;
}
declare const UpdateForgotPassDTO_base: import("@nestjs/common").Type<Partial<ForgotPassAccountDto>>;
export declare class UpdateForgotPassDTO extends UpdateForgotPassDTO_base {
    id: string;
}
export {};
