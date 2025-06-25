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
exports.DocSignedUserDTO = exports.DocUserOutputDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const domain_1 = require("../../domain");
class DocUserOutputDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'id' }),
    __metadata("design:type", String)
], DocUserOutputDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'firstname',
        description: 'The familly name of the account',
    }),
    __metadata("design:type", String)
], DocUserOutputDTO.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'lastname',
        description: 'The lastname or given name of the account',
    }),
    __metadata("design:type", String)
], DocUserOutputDTO.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'email',
        description: 'The email address on which share some information with the user by notification',
        required: false,
    }),
    __metadata("design:type", String)
], DocUserOutputDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
        description: 'The phone number on which contact the account user or send an OTP information',
    }),
    __metadata("design:type", String)
], DocUserOutputDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: domain_1.SexEnum, name: 'sex', required: false }),
    __metadata("design:type", String)
], DocUserOutputDTO.prototype, "sex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'country' }),
    __metadata("design:type", String)
], DocUserOutputDTO.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'avatar' }),
    __metadata("design:type", String)
], DocUserOutputDTO.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, name: 'solde' }),
    __metadata("design:type", Number)
], DocUserOutputDTO.prototype, "solde", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, name: 'isActivated' }),
    __metadata("design:type", Boolean)
], DocUserOutputDTO.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, name: 'createdAt' }),
    __metadata("design:type", Date)
], DocUserOutputDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, name: 'updatedAt' }),
    __metadata("design:type", Date)
], DocUserOutputDTO.prototype, "updatedAt", void 0);
exports.DocUserOutputDTO = DocUserOutputDTO;
class DocSignedUserDTO extends DocUserOutputDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'accessToken' }),
    __metadata("design:type", String)
], DocSignedUserDTO.prototype, "accessToken", void 0);
exports.DocSignedUserDTO = DocSignedUserDTO;
//# sourceMappingURL=doc.user.dto.js.map