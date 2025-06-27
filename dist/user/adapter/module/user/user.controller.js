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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../../_shared/adapter/dto");
const domain_1 = require("../../../domain");
const user_1 = require("../../../app/module/user");
const user_model_1 = require("../../../domain/user.model");
const decorator_1 = require("../../../../_shared/adapter/decorator");
const decorator_2 = require("../../decorator");
const dto_2 = require("../../dto");
const user_factory_1 = require("../../user.factory");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getCurrentUser({ id }) {
        return await this.userService.getCurrentUser(id);
    }
    async getProfile(req) {
        console.log(req);
        return await this.userService.getCurrentUser(req.user);
    }
    async all() {
        const users = await this.userService.fetchAll();
        return users === null || users === void 0 ? void 0 : users.map((user) => user_factory_1.UserFactory.getUser(user));
    }
    async signinByToken(user) {
        return user_factory_1.UserFactory.getUser(user);
    }
    async search(param) {
        if (param) {
            return user_factory_1.UserFactory.getUser(await this.userService.search(param));
        }
    }
    async show({ id }) {
        return user_factory_1.UserFactory.getUser(await this.userService.fetchOne(id));
    }
    async create(data) {
        const user = await this.userService.add(data);
        if (user)
            return user_factory_1.UserFactory.getUser(user);
    }
    async update(data) {
        return user_factory_1.UserFactory.getUser(await this.userService.edit(data));
    }
    async setState({ id }) {
        return await this.userService.setState(id);
    }
    remove({ id }) {
        return this.userService.remove(id);
    }
    async reinitialisePass(data) {
        const user = await this.userService.reinitialisePass(data);
        return user;
    }
    async changePass(data) {
        const user = await this.userService.changePass(data);
        return user;
    }
    async getUserTickets({ id }) {
        return await this.userService.getUserTickets(id);
    }
    async getUserBets({ id }) {
        return await this.userService.getUserBets(id);
    }
    async getUserParis({ id }) {
        return await this.userService.getUserParis(id);
    }
    async deleteUserBet(data) {
        return await this.userService.deleteUserBet(data);
    }
    async deleteUserTicket(data) {
        return await this.userService.deleteUserTicket(data);
    }
};
__decorate([
    (0, common_1.Get)("current/:id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Get)("profile"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_1.HasPermission)(domain_1.AccessEnum.CAN_SHOW_USER_LIST),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Users list',
        description: 'Fetch all users in the DB',
    }),
    (0, swagger_1.ApiResponse)({ type: [dto_2.DocUserOutputDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('token.signin'),
    (0, swagger_1.ApiOperation)({ summary: 'Token connexion' }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocSignedUserDTO }),
    __param(0, (0, decorator_2.GetAccount)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signinByToken", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Single account',
        description: 'Fetch the staff account by some of its informations',
    }),
    (0, swagger_1.ApiQuery)({
        type: String,
        name: 'email',
        description: 'email of the auth staff',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        type: String,
        name: 'phone',
        description: 'phone number of the auth staff',
        required: false,
    }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocUserOutputDTO }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UserQueryDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_1.HasPermission)(domain_1.AccessEnum.CAN_SHOW_USER),
    (0, swagger_1.ApiOperation)({
        summary: 'One User',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocUserOutputDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "show", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.UseInterceptors)(),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create account user',
    }),
    (0, swagger_1.ApiBody)({ type: dto_2.UserRegisterDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocUserOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UserRegisterDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)("update"),
    (0, decorator_1.HasPermission)(domain_1.AccessEnum.CAN_UPDATE_USER),
    (0, common_1.UseInterceptors)(),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user account' }),
    (0, swagger_1.ApiBody)({ type: dto_2.UpdateUserDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocUserOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, decorator_1.HasPermission)(domain_1.AccessEnum.CAN_SET_USER_STATE),
    (0, swagger_1.ApiOperation)({ summary: 'Set user account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setState", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_1.HasPermission)(domain_1.AccessEnum.CAN_DELETE_USER),
    (0, swagger_1.ApiOperation)({ summary: 'Remove Account' }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the user to delete',
    }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("reinitialise-pass"),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Réinitialise mot de passe',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.ReinitialisePassAccountDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "reinitialisePass", null);
__decorate([
    (0, common_1.Post)("change-pass"),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Changement de mot de passe',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.ChangePassAccountDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePass", null);
__decorate([
    (0, common_1.Get)('tickets/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserTickets", null);
__decorate([
    (0, common_1.Get)('coupons/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserBets", null);
__decorate([
    (0, common_1.Get)('paris/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserParis", null);
__decorate([
    (0, common_1.Post)('bet/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.DeleteUserBetDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserBet", null);
__decorate([
    (0, common_1.Post)('ticket/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.DeleteUserTicketDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserTicket", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('Users management'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_1.IUserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map