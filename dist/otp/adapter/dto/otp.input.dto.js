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
exports.VerifyOtpDTo = exports.SendOtpDTo = exports.UpdateOtpDTO = exports.OtpAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OtpAccountDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'code',
        description: 'otp',
        uniqueItems: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtpAccountDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtpAccountDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        name: 'isVerified',
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OtpAccountDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        name: 'expiresAt',
        description: 'date d\'expiration',
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], OtpAccountDto.prototype, "expiresAt", void 0);
exports.OtpAccountDto = OtpAccountDto;
class UpdateOtpDTO extends (0, swagger_1.PartialType)(OtpAccountDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de l\'Otp',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateOtpDTO.prototype, "id", void 0);
exports.UpdateOtpDTO = UpdateOtpDTO;
class SendOtpDTo {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendOtpDTo.prototype, "phone", void 0);
exports.SendOtpDTo = SendOtpDTo;
class VerifyOtpDTo {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyOtpDTo.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'code',
        description: 'otp',
        uniqueItems: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyOtpDTo.prototype, "code", void 0);
exports.VerifyOtpDTo = VerifyOtpDTo;
//# sourceMappingURL=otp.input.dto.js.map