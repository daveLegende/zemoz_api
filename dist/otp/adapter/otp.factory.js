"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpFactory = void 0;
const domain_1 = require("../domain");
class OtpFactory {
    static async create(data) {
        const otp = new domain_1.Otp();
        otp.code = data.code;
        otp.phone = data.phone;
        otp.expiresAt = data.expiresAt;
        return otp;
    }
    static update(otp, data) {
        var _a, _b, _c, _d;
        otp.code = (_a = data.code) !== null && _a !== void 0 ? _a : otp.code;
        otp.phone = (_b = data.phone) !== null && _b !== void 0 ? _b : otp.phone;
        otp.isVerified = (_c = data.isVerified) !== null && _c !== void 0 ? _c : otp.isVerified;
        otp.expiresAt = (_d = data.expiresAt) !== null && _d !== void 0 ? _d : otp.expiresAt;
        return otp;
    }
    static getOtp(otp) {
        if (otp) {
            return {
                id: otp.id,
                phone: otp.phone,
                code: otp.code,
                isVerified: otp.isVerified,
                expiresAt: otp.expiresAt,
                createdAt: otp.createdAt,
                updatedAt: otp.updatedAt,
                deletedAt: otp.deletedAt
            };
        }
    }
}
exports.OtpFactory = OtpFactory;
//# sourceMappingURL=otp.factory.js.map