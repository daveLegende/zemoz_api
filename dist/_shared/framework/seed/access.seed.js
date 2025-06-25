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
exports.AccessSeed = void 0;
const common_1 = require("@nestjs/common");
const nestjs_command_1 = require("nestjs-command");
const access_constant_1 = require("../../domain/access.constant");
const auth_api_service_1 = require("../../../user/framework/API/auth.api.service");
let AccessSeed = class AccessSeed {
    constructor(authAPIService) {
        this.authAPIService = authAPIService;
    }
    async create() {
        const isOkay = await this.authAPIService.api.addAccess(access_constant_1.RULES);
        if (isOkay) {
            console.info("Droits d'accès créés avec succès");
        }
    }
};
__decorate([
    (0, nestjs_command_1.Command)({ command: 'create:rule', describe: 'Create admin account rules' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccessSeed.prototype, "create", null);
AccessSeed = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_api_service_1.AuthAPIService])
], AccessSeed);
exports.AccessSeed = AccessSeed;
//# sourceMappingURL=access.seed.js.map