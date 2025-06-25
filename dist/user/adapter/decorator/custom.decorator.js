"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccount = void 0;
const common_1 = require("@nestjs/common");
exports.GetAccount = (0, common_1.createParamDecorator)((data, context) => {
    const req = context.switchToHttp().getRequest();
    console.log('Request in GetAccount:', req);
    if (req === null || req === void 0 ? void 0 : req.user) {
        console.log('User found in request:', req.user);
        return req.user;
    }
    throw new common_1.UnauthorizedException('User not found in request');
});
//# sourceMappingURL=custom.decorator.js.map