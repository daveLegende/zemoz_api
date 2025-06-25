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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const otp_factory_1 = require("../otp.factory");
const twilio_service_1 = require("../../../twilio/twilio.service");
let OtpService = class OtpService {
    constructor(otpRepository, twilioService) {
        this.otpRepository = otpRepository;
        this.twilioService = twilioService;
        this.logger = new common_1.Logger();
    }
    async fetchOne(id) {
        try {
            const otp = await this.otpRepository.otps.findOneByID(id);
            if (otp) {
                return otp;
            }
            throw new common_1.NotFoundException('Otp not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::OtpService.fetchOne');
            throw error;
        }
    }
    async add(data) {
        try {
            const { phone } = data;
            const existed = await this.otpRepository.otps.findOneBy({ phone });
            if (existed)
                throw new common_1.ConflictException('Otp already exist');
            const otpEntity = await this.otpRepository.otps.create(await otp_factory_1.OtpFactory.create(data));
            return otpEntity;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::OtpService.add');
            throw error;
        }
    }
    async remove(id) {
        try {
            const Otp = await this.otpRepository.otps.findOneByID(id);
            if (Otp) {
                return await this.otpRepository.otps.remove(Otp).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::OtpService.remove');
            return false;
        }
    }
    async verifyOtp(phone, code) {
        const otp = await this.otpRepository.otps.findOne({ where: { phone: phone, code: code } });
        if (!code) {
            throw new common_1.BadRequestException('Code incorrecte');
        }
        if (otp.expiresAt < new Date()) {
            throw new common_1.BadRequestException('OTP expiré');
        }
        otp.isVerified = true;
        await this.otpRepository.otps.update(otp);
        return true;
    }
};
OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_1.IOtpRepository,
        twilio_service_1.TwilioService])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map