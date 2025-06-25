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
exports.OtpEntity = void 0;
const domain_1 = require("../../../domain");
const typeorm_1 = require("typeorm");
let OtpEntity = class OtpEntity extends domain_1.Otp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OtpEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OtpEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OtpEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OtpEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], OtpEntity.prototype, "expiresAt", void 0);
OtpEntity = __decorate([
    (0, typeorm_1.Entity)('otp')
], OtpEntity);
exports.OtpEntity = OtpEntity;
//# sourceMappingURL=otp.entity.js.map