"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const hash_factory_1 = require("./guard/hash.factory");
const user_model_1 = require("../domain/user.model");
class UserFactory {
    static async create(data) {
        const user = new user_model_1.User();
        user.email = data.email;
        user.phone = data.phone;
        user.firstname = data.firstname;
        user.lastname = data.lastname;
        user.solde = data.solde;
        user.sex = data.sex;
        user.country = data.country;
        user.avatar = data.avatar;
        user.password = await hash_factory_1.HashFactory.hashPwd(data.password);
        return user;
    }
    static update(user, data) {
        var _a, _b, _c, _d;
        user.email = (_a = data.email) !== null && _a !== void 0 ? _a : user.email;
        user.firstname = (_b = data.firstname) !== null && _b !== void 0 ? _b : user.firstname;
        user.lastname = (_c = data.lastname) !== null && _c !== void 0 ? _c : user.lastname;
        user.solde = (_d = data.solde) !== null && _d !== void 0 ? _d : user.solde;
        user.avatar = data.avatar;
        return user;
    }
    static getFileLink(file) {
        if (file) {
            return `${process.env.APP_BASE_URL}/files/${file}`;
        }
    }
    static getUser(user) {
        if (user) {
            return {
                id: user.id,
                email: user.email,
                phone: user.phone,
                firstname: user.firstname,
                lastname: user.lastname,
                solde: user.solde,
                country: user.country,
                sex: user.sex,
                avatar: this.getFileLink(user.avatar),
                isActivated: user.isActivated,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        }
    }
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=user.factory.js.map