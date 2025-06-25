"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerFactory = void 0;
const domain_1 = require("../domain");
class PlayerFactory {
    static async create(data, equipe) {
        const player = new domain_1.Player();
        player.age = data.age;
        player.phone = data.phone;
        player.firstname = data.firstname;
        player.lastname = data.lastname;
        player.avatar = data.avatar;
        player.team = equipe;
        return player;
    }
    static update(player, data) {
        var _a, _b, _c, _d, _e;
        player.age = (_a = data.age) !== null && _a !== void 0 ? _a : player.age;
        player.phone = (_b = data.phone) !== null && _b !== void 0 ? _b : player.phone;
        player.firstname = (_c = data.firstname) !== null && _c !== void 0 ? _c : player.firstname;
        player.lastname = (_d = data.lastname) !== null && _d !== void 0 ? _d : player.lastname;
        player.avatar = (_e = data.avatar) !== null && _e !== void 0 ? _e : player.avatar;
        return player;
    }
    static getFileLink(file) {
        if (file) {
            return `${process.env.APP_BASE_URL}/files/${file}`;
        }
    }
    static getPlayer(player) {
        if (player) {
            return {
                id: player.id,
                firstname: player.firstname,
                lastname: player.lastname,
                age: player.age,
                phone: player.phone,
                buts: player.buts,
                passes: player.passes,
                team: player.team,
                avatar: this.getFileLink(player.avatar),
                createdAt: player.createdAt,
                updatedAt: player.updatedAt,
                deletedAt: player.deletedAt
            };
        }
    }
}
exports.PlayerFactory = PlayerFactory;
//# sourceMappingURL=player.factory.js.map