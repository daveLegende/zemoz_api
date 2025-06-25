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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PasswordService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const pwd_entity_1 = require("./entity/pwd.entity");
const schedule_1 = require("@nestjs/schedule");
let PasswordService = PasswordService_1 = class PasswordService {
    constructor(passwordRepository) {
        this.passwordRepository = passwordRepository;
        this.logger = new common_1.Logger(PasswordService_1.name);
    }
    async generateAndSendPassword() {
        const pass = crypto.randomBytes(6).toString('hex');
        const hashedPass = await bcrypt.hash(pass, 10);
        const password = new pwd_entity_1.PasswordEntity();
        password.pass = hashedPass;
        await this.passwordRepository.save(password);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'davidawayitou5@gmail.com',
            subject: 'Mot de passe de transaction du jour',
            text: `Votre mot de passe de transaction du jour : ${pass}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
            }
            else {
                console.log('Email envoyé:', info.response);
            }
        });
    }
    async deleteOldPasswords() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const count = await this.passwordRepository.count({
            where: { createdAt: (0, typeorm_2.LessThan)(yesterday) },
        });
        if (count > 0) {
            await this.passwordRepository.delete({
                createdAt: (0, typeorm_2.LessThan)(yesterday),
            });
            console.log('Les anciens mots de passe ont été supprimés.');
        }
        else {
            console.log('Aucun mot de passe à supprimer.');
        }
    }
    async scheduleDailyPasswordGeneration() {
        await this.deleteOldPasswords();
        await this.generateAndSendPassword();
    }
};
__decorate([
    (0, schedule_1.Cron)('0 30 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PasswordService.prototype, "scheduleDailyPasswordGeneration", null);
PasswordService = PasswordService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pwd_entity_1.PasswordEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PasswordService);
exports.PasswordService = PasswordService;
//# sourceMappingURL=password.service.js.map