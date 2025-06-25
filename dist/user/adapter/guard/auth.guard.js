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
exports.UserGuard = exports._extractTokenFromHeader = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const data_abstract_1 = require("../../domain/data.abstract");
const auth_api_service_1 = require("../../framework/API/auth.api.service");
const _extractTokenFromHeader = (request) => {
    var _a, _b;
    const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
    return type === 'Bearer' ? token : undefined;
};
exports._extractTokenFromHeader = _extractTokenFromHeader;
let UserGuard = class UserGuard {
    constructor(dataServices, authAPIServices, reflector) {
        this.dataServices = dataServices;
        this.authAPIServices = authAPIServices;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        const permission = this.reflector.getAllAndOverride('permission', [context.getHandler(), context.getClass()]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = (0, exports._extractTokenFromHeader)(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const user = await this.authAPIServices.api.tokenLogin(token, permission);
            if (user) {
                const account = await this.dataServices.users.findOneBy({
                    email: user.email,
                    phone: user.phone,
                });
                if (account)
                    request['user'] = account;
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
UserGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_abstract_1.IUserRepository,
        auth_api_service_1.AuthAPIService,
        core_1.Reflector])
], UserGuard);
exports.UserGuard = UserGuard;
//# sourceMappingURL=auth.guard.js.map