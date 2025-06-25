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
exports.PhoneParamDTO = exports.IDParamDTO = void 0;
const class_validator_1 = require("class-validator");
class IDParamDTO {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], IDParamDTO.prototype, "id", void 0);
exports.IDParamDTO = IDParamDTO;
class PhoneParamDTO {
}
__decorate([
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], PhoneParamDTO.prototype, "phone", void 0);
exports.PhoneParamDTO = PhoneParamDTO;
//# sourceMappingURL=param.dto.js.map