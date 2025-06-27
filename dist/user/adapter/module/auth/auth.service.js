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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_1 = require("../../../app/module/user");
const bcrypt = require("bcrypt");
const moment = require("moment");
const domain_1 = require("../../../../otp/domain");
const twilio_service_1 = require("../../../../twilio/twilio.service");
const otp_factory_1 = require("../../../../otp/adapter/otp.factory");
const dto_1 = require("../../../../otp/adapter/dto");
const domain_2 = require("../../../domain");
let AuthService = class AuthService {
    constructor(usersService, userRepository, otpRepository, twilioService, jwtService) {
        this.usersService = usersService;
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.twilioService = twilioService;
        this.jwtService = jwtService;
    }
    async validateUser(phone, password) {
        console.log('Validating user credentials for:', phone);
        const user = await this.usersService.fetchByPhone(phone);
        if (!user) {
            console.log(`User not found for email: ${phone}`);
            throw new common_1.BadRequestException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log(`Invalid password for phone: ${phone}`);
            throw new common_1.BadRequestException('Invalid credentials');
        }
        return user;
    }
    async login(user) {
        const payload = { phone: user.phone, sub: user.userId };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
        };
    }
    async refreshTokens(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
            const newAccessToken = this.jwtService.sign({ sub: payload.sub, phone: payload.phone }, { secret: process.env.JWT_SECRET, expiresIn: '15m' });
            const newRefreshToken = this.jwtService.sign({ sub: payload.sub, phone: payload.phone }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' });
            return {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async sendOTP(data) {
        try {
            const { phone } = data;
            const user = await this.userRepository.users.findOneBy({ phone: phone });
            const existed = await this.otpRepository.otps.findOneBy({ phone });
            if (user)
                throw new common_1.ConflictException('Cet utilisateur existe déja');
            if (existed)
                throw new common_1.ConflictException('Otp already exist');
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            const otpExpirationTime = moment().add(5, 'minutes').toDate();
            try {
                await this.twilioService.sendOtp(phone, otp);
            }
            catch (twilioError) {
                throw new Error('Une erreur s\'est produite, veuillez réessayer ' + twilioError);
            }
            const datas = new dto_1.OtpAccountDto();
            datas.code = otp;
            datas.phone = phone;
            datas.isVerified = false;
            datas.expiresAt = otpExpirationTime;
            const otpEntity = await this.otpRepository.otps.create(await otp_factory_1.OtpFactory.create(datas));
            return otpEntity;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyOtp(data) {
        try {
            const { code, phone } = data;
            const otp = await this.otpRepository.otps.findOne({ where: { phone: phone, code: code } });
            if (!code) {
                throw new common_1.BadRequestException('Code incorrecte');
            }
            if (otp.expiresAt < new Date() || otp.isVerified) {
                throw new common_1.BadRequestException('OTP expiré');
            }
            otp.isVerified = true;
            await this.otpRepository.otps.update(otp);
            return true;
        }
        catch (error) {
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_1.IUserService,
        domain_2.IUserRepository,
        domain_1.IOtpRepository,
        twilio_service_1.TwilioService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map