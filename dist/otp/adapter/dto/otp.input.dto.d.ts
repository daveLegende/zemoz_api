export declare class OtpAccountDto {
    code: string;
    phone: string;
    isVerified?: boolean;
    expiresAt: Date;
}
declare const UpdateOtpDTO_base: import("@nestjs/common").Type<Partial<OtpAccountDto>>;
export declare class UpdateOtpDTO extends UpdateOtpDTO_base {
    id: string;
}
export declare class SendOtpDTo {
    phone: string;
}
export declare class VerifyOtpDTo {
    phone: string;
    code: string;
}
export {};
