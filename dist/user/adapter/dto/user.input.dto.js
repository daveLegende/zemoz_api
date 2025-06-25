"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserTicketDTO = exports.DeleteUserBetDTO = exports.ChangePassAccountDTO = exports.ReinitialisePassAccountDTO = exports.UserQueryDTO = exports.UpdateUserDTO = exports.ResetPasswordDTO = exports.ForgotPasswordDTO = exports.SigninAccoutDTO = exports.RegisterAccoutDTO = exports.UserAccoutDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_enum_1 = require("../../domain/user.enum");
class UserAccoutDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'firstname',
        description: 'The familly name of the account',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAccoutDTO.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'lastname',
        description: 'The lastname or given name of the account',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAccoutDTO.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: user_enum_1.SexEnum, name: 'sex', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_enum_1.SexEnum),
    __metadata("design:type", String)
], UserAccoutDTO.prototype, "sex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'email',
        description: 'The email address on which share some information with the user by notification',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserAccoutDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
        description: 'The phone number on which contact the account user or send an OTP information',
    }),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], UserAccoutDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'country',
        description: 'The complete description of the supplier country',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAccoutDTO.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'binary', name: 'avatar' }),
    __metadata("design:type", String)
], UserAccoutDTO.prototype, "avatar", void 0);
exports.UserAccoutDTO = UserAccoutDTO;
class RegisterAccoutDTO extends UserAccoutDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'password',
        description: 'Password of the user',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterAccoutDTO.prototype, "password", void 0);
exports.RegisterAccoutDTO = RegisterAccoutDTO;
class SigninAccoutDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'email',
        description: 'The email address if the plateform use it for login',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SigninAccoutDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
        description: 'The phone number if the plateform use it for login',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], SigninAccoutDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'password' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SigninAccoutDTO.prototype, "password", void 0);
exports.SigninAccoutDTO = SigninAccoutDTO;
class ForgotPasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'email',
        description: 'The email address if the plateform use it for login',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ForgotPasswordDTO.prototype, "email", void 0);
exports.ForgotPasswordDTO = ForgotPasswordDTO;
class ResetPasswordDTO extends SigninAccoutDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'otpCode',
        description: 'The otp validation code for reseting',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "otpCode", void 0);
exports.ResetPasswordDTO = ResetPasswordDTO;
class UpdateUserDTO extends (0, swagger_1.PartialType)(UserAccoutDTO) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID of the given user',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "id", void 0);
exports.UpdateUserDTO = UpdateUserDTO;
class UserQueryDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'email',
        description: 'email of the given user',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserQueryDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
        description: 'phone number of the given user',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserQueryDTO.prototype, "phone", void 0);
exports.UserQueryDTO = UserQueryDTO;
class ReinitialisePassAccountDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'email',
        description: 'email Password of the user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReinitialisePassAccountDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'password',
        description: 'Password of the user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReinitialisePassAccountDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'confirm',
        description: 'Confirm Password of the user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReinitialisePassAccountDTO.prototype, "confirm", void 0);
exports.ReinitialisePassAccountDTO = ReinitialisePassAccountDTO;
class ChangePassAccountDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'id of user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePassAccountDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'oldpass',
        description: 'Password of the user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePassAccountDTO.prototype, "oldpass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'newpass',
        description: 'Password of the user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePassAccountDTO.prototype, "newpass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'confirm',
        description: 'Confirm Password of the user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePassAccountDTO.prototype, "confirm", void 0);
exports.ChangePassAccountDTO = ChangePassAccountDTO;
class DeleteUserBetDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'id of coupon',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteUserBetDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'id of user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteUserBetDTO.prototype, "userId", void 0);
exports.DeleteUserBetDTO = DeleteUserBetDTO;
class DeleteUserTicketDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'id of ticket',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteUserTicketDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'id of user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteUserTicketDTO.prototype, "userId", void 0);
exports.DeleteUserTicketDTO = DeleteUserTicketDTO;
//# sourceMappingURL=user.input.dto.js.map