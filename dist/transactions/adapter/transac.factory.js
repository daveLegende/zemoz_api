"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionFactory = void 0;
const domain_1 = require("../domain");
class TransactionFactory {
    static async create(data, admin) {
        const transaction = new domain_1.Transaction();
        transaction.phone = data.phone;
        transaction.admin = admin;
        transaction.amount = data.amount;
        transaction.type = data.type;
        return transaction;
    }
    static update(transaction, data) {
        var _a, _b;
        transaction.type = (_a = data.type) !== null && _a !== void 0 ? _a : transaction.type;
        transaction.amount = (_b = data.amount) !== null && _b !== void 0 ? _b : transaction.amount;
        transaction.phone = transaction.phone;
        transaction.admin = transaction.admin;
        return transaction;
    }
    static getTransaction(transaction) {
        if (transaction) {
            return {
                id: transaction.id,
                type: transaction.type,
                amount: transaction.amount,
                phone: transaction.phone,
                admin: transaction.admin,
                createdAt: transaction.createdAt,
                updatedAt: transaction.updatedAt,
                deletedAt: transaction.deletedAt
            };
        }
    }
}
exports.TransactionFactory = TransactionFactory;
//# sourceMappingURL=transac.factory.js.map