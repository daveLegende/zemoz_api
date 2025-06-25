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
exports.UpdateForgotPassDTO = exports.ForgotPassAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ForgotPassAccountDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'code',
        description: 'code envoyé sur le mail',
        uniqueItems: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ForgotPassAccountDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'email',
        description: 'user email',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ForgotPassAccountDto.prototype, "email", void 0);
exports.ForgotPassAccountDto = ForgotPassAccountDto;
class UpdateForgotPassDTO extends (0, swagger_1.PartialType)(ForgotPassAccountDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de l\'ForgotPass',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateForgotPassDTO.prototype, "id", void 0);
exports.UpdateForgotPassDTO = UpdateForgotPassDTO;
//# sourceMappingURL=fgp.input.dto.js.map