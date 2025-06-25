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
exports.DocBetOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../domain");
class DocBetOutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], DocBetOutputDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: domain_1.CategoryName,
        name: 'category',
        description: 'VICTOIRE ou DEUX MARQUENT ou CARTON ROUGE',
    }),
    (0, class_validator_1.IsEnum)(domain_1.CategoryName),
    __metadata("design:type", String)
], DocBetOutputDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'les cotes avec les options', type: Object }),
    __metadata("design:type", Object)
], DocBetOutputDto.prototype, "odds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'match id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocBetOutputDto.prototype, "match", void 0);
exports.DocBetOutputDto = DocBetOutputDto;
//# sourceMappingURL=doc.output.dto.js.map