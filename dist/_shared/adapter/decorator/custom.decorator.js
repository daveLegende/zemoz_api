"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasPermission = exports.Public = void 0;
const common_1 = require("@nestjs/common");
const Public = () => (0, common_1.SetMetadata)('isPublic', true);
exports.Public = Public;
const HasPermission = (p) => (0, common_1.SetMetadata)('permission', p);
exports.HasPermission = HasPermission;
//# sourceMappingURL=custom.decorator.js.map