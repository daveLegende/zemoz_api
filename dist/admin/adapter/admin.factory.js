"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminFactory = void 0;
const domain_1 = require("../domain");
const hash_factory_1 = require("./guard/hash.factory");
class AdminFactory {
    static async create(data) {
        const admin = new domain_1.Admin();
        admin.nom = data.nom;
        admin.email = data.email;
        admin.password = await hash_factory_1.HashFactory.hashPwd(data.password);
        return admin;
    }
    static update(admin, data) {
        var _a, _b, _c;
        admin.nom = (_a = data.nom) !== null && _a !== void 0 ? _a : admin.nom;
        admin.email = (_b = data.email) !== null && _b !== void 0 ? _b : admin.email;
        admin.password = (_c = data.password) !== null && _c !== void 0 ? _c : admin.password;
        return admin;
    }
    static getFileLink(file) {
        if (file) {
            return `${process.env.APP_BASE_URL}/files/${file}`;
        }
    }
    static getAdmin(admin) {
        if (admin) {
            return {
                id: admin.id,
                nom: admin.nom,
                email: admin.email,
                password: admin.password,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
                deletedAt: admin.deletedAt
            };
        }
    }
}
exports.AdminFactory = AdminFactory;
//# sourceMappingURL=admin.factory.js.map