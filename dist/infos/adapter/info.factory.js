"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoFactory = void 0;
const domain_1 = require("../domain");
class InfoFactory {
    static async create(data) {
        const info = new domain_1.Info();
        info.image = data.image;
        info.title = data.title;
        info.desc = data.desc;
        return info;
    }
    static update(info, data) {
        var _a, _b, _c;
        info.image = (_a = data.image) !== null && _a !== void 0 ? _a : info.image;
        info.title = (_b = data.title) !== null && _b !== void 0 ? _b : info.title;
        info.desc = (_c = data.desc) !== null && _c !== void 0 ? _c : info.desc;
        return info;
    }
    static getFileLink(file) {
        if (file) {
            return `${process.env.APP_BASE_URL}/files/${file}`;
        }
    }
    static getInfo(info) {
        if (info) {
            return {
                id: info.id,
                image: this.getFileLink(info.image),
                title: info.title,
                desc: info.desc,
                createdAt: info.createdAt,
                updatedAt: info.updatedAt,
                deletedAt: info.deletedAt
            };
        }
    }
}
exports.InfoFactory = InfoFactory;
//# sourceMappingURL=info.factory.js.map