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
exports.UpdateInfoDTO = exports.InfoAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class InfoAccountDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'binary', name: 'image' }),
    __metadata("design:type", String)
], InfoAccountDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'titre de la Info',
        description: 'exemple Info A',
        uniqueItems: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InfoAccountDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'description de la Info',
        description: 'description',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InfoAccountDto.prototype, "desc", void 0);
exports.InfoAccountDto = InfoAccountDto;
class UpdateInfoDTO extends (0, swagger_1.PartialType)(InfoAccountDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de l\'info',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateInfoDTO.prototype, "id", void 0);
exports.UpdateInfoDTO = UpdateInfoDTO;
//# sourceMappingURL=info.input.dto.js.map