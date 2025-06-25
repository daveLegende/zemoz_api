"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const twilio_1 = require("twilio");
let TwilioService = class TwilioService {
    constructor(configService) {
        this.configService = configService;
        const accountSid = "ACdb1752f4aeedffd623f65d477d90778c";
        const authToken = "95a6493555a8c817bfbe0c3d7a210f65";
        this.client = new twilio_1.Twilio(accountSid, authToken);
    }
    async sendOtp(to, otp) {
        const from = "+16263250910";
        return this.client.messages.create({
            body: `Votre code de vérification est: ${otp}`,
            from,
            to,
        });
    }
};
TwilioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TwilioService);
exports.TwilioService = TwilioService;
//# sourceMappingURL=twilio.service.js.map