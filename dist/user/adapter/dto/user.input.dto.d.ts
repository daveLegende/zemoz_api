import { IForgotPasswordDTO, ISigninUserDTO } from 'user/app/dto/auth.input.dto';
import { SexEnum } from 'user/domain/user.enum';
export declare class UserAccoutDTO {
    firstname: string;
    lastname: string;
    sex?: SexEnum;
    email?: string;
    phone: string;
    country: string;
    avatar?: string;
}
export declare class RegisterAccoutDTO extends UserAccoutDTO {
    password: string;
}
export declare class SigninAccoutDTO implements ISigninUserDTO {
    email?: string;
    phone?: string;
    password: string;
}
export declare class ForgotPasswordDTO {
    email?: string;
}
export declare class ResetPasswordDTO extends SigninAccoutDTO {
    otpCode: string;
}
declare const UpdateUserDTO_base: import("@nestjs/common").Type<Partial<UserAccoutDTO>>;
export declare class UpdateUserDTO extends UpdateUserDTO_base {
    id: string;
}
export declare class UserQueryDTO implements IForgotPasswordDTO {
    email?: string;
    phone?: string;
}
export declare class ReinitialisePassAccountDTO {
    email: string;
    password: string;
    confirm: string;
}
export declare class ChangePassAccountDTO {
    id: string;
    oldpass: string;
    newpass: string;
    confirm: string;
}
export declare class DeleteUserBetDTO {
    id: string;
    userId: string;
}
export declare class DeleteUserTicketDTO {
    id: string;
    userId: string;
}
export {};
