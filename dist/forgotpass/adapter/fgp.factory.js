"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPassFactory = void 0;
const domain_1 = require("../domain");
const hash_factory_1 = require("../../user/adapter/guard/hash.factory");
class ForgotPassFactory {
    static async create(data) {
        const fgp = new domain_1.ForgotPass();
        fgp.code = await hash_factory_1.HashFactory.hashPwd(data.code);
        fgp.email = data.email;
        return fgp;
    }
    static getFgp(fgp) {
        if (fgp) {
            return {
                id: fgp.id,
                code: fgp.code,
                email: fgp.email,
                createdAt: fgp.createdAt,
                updatedAt: fgp.updatedAt,
                deletedAt: fgp.deletedAt
            };
        }
    }
}
exports.ForgotPassFactory = ForgotPassFactory;
//# sourceMappingURL=fgp.factory.js.map