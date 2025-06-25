"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashFactory = void 0;
const bcrypt = require("bcryptjs");
class HashFactory {
    static async hashPwd(password) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
    static async isRightPwd(password, pass) {
        return await bcrypt.compare(password, pass);
    }
}
exports.HashFactory = HashFactory;
//# sourceMappingURL=hash.factory.js.map