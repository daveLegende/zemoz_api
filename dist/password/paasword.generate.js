"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionPass = void 0;
function generateTransactionPass() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_/&';
    let pass = '';
    for (let i = 0; i < 8; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
}
exports.generateTransactionPass = generateTransactionPass;
//# sourceMappingURL=paasword.generate.js.map