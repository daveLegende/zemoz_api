"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketFactory = void 0;
const domain_1 = require("../domain");
class TicketFactory {
    static async create(data, user) {
        const ticket = new domain_1.Ticket();
        ticket.type = data.type;
        ticket.duree = data.duree;
        ticket.etat = data.etat;
        ticket.amount = data.amount;
        ticket.user = user;
        ticket.date = data.date;
        return ticket;
    }
    static update(ticket, data) {
        var _a, _b, _c, _d;
        ticket.type = (_a = data.type) !== null && _a !== void 0 ? _a : ticket.type;
        ticket.duree = (_b = data.duree) !== null && _b !== void 0 ? _b : ticket.duree;
        ticket.etat = (_c = data.etat) !== null && _c !== void 0 ? _c : ticket.etat;
        ticket.amount = (_d = data.amount) !== null && _d !== void 0 ? _d : ticket.amount;
        ticket.date = data.date;
        ticket.isDeleted = data.isDeleted;
        return ticket;
    }
    static getTicket(ticket) {
        if (ticket) {
            return {
                id: ticket.id,
                type: ticket.type,
                duree: ticket.duree,
                etat: ticket.etat,
                amount: ticket.amount,
                user: ticket.user,
                date: ticket.date,
                matchs: ticket.matchs,
                isDeleted: ticket.isDeleted,
                createdAt: ticket.createdAt,
                updatedAt: ticket.updatedAt,
                deletedAt: ticket.deletedAt
            };
        }
    }
}
exports.TicketFactory = TicketFactory;
//# sourceMappingURL=ticket.factory.js.map