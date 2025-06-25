"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAPIService = void 0;
const common_1 = require("@nestjs/common");
class GenericAuthAPI {
    constructor() {
        this._admin = {
            id: 'Admin_id',
            firstname: 'toto',
            lastname: 'tata',
            address: 'simple addres',
            phone: '+22890001111',
            email: 'toto@tata.com',
            isActivated: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.API_HEADERS = {
            'x-api-key': undefined,
        };
    }
    async signin(data) {
        return this.axiosAdapter.post(`${this._apiUrl}/signin`, data, {
            headers: this.API_HEADERS,
        });
    }
    async addAccess(rules) {
        return this.axiosAdapter.post(`${this._apiUrl}/access.groups/bulk`, rules, {
            headers: this.API_HEADERS,
        });
    }
    async tokenLogin(token, permission) {
        return this._admin;
    }
}
let AuthAPIService = class AuthAPIService {
    onApplicationBootstrap() {
        this.api = new GenericAuthAPI();
    }
};
AuthAPIService = __decorate([
    (0, common_1.Injectable)()
], AuthAPIService);
exports.AuthAPIService = AuthAPIService;
//# sourceMappingURL=auth.api.service.js.map