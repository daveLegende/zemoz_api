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
exports.OddsDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OddsDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Victoire du home', type: Number, example: 'V1' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'La cote V1 doit être ≥ 1' }),
    __metadata("design:type", Number)
], OddsDTO.prototype, "V1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Match nul', type: Number, example: 'X' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'La cote X doit être ≥ 1' }),
    __metadata("design:type", Number)
], OddsDTO.prototype, "X", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Victoire de away', type: Number, example: 'V2' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'La cote V2 doit être ≥ 1' }),
    __metadata("design:type", Number)
], OddsDTO.prototype, "V2", void 0);
exports.OddsDTO = OddsDTO;
//# sourceMappingURL=odds.dto.js.map