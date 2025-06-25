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
exports.DocOtpOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DocOtpOutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocOtpOutputDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'code',
        description: 'otp',
        uniqueItems: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocOtpOutputDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocOtpOutputDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        name: 'expiresAt',
        description: 'date d\'expiration',
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DocOtpOutputDto.prototype, "expiresAt", void 0);
exports.DocOtpOutputDto = DocOtpOutputDto;
//# sourceMappingURL=doc.otp.dto.js.map