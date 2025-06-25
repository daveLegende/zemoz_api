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
exports.ForgotPassService = void 0;
const common_1 = require("@nestjs/common");
const fgp_factory_1 = require("../fgp.factory");
const domain_1 = require("../../../user/domain");
const domain_2 = require("../../domain");
const nodemailer = require("nodemailer");
let ForgotPassService = class ForgotPassService {
    constructor(fgpRepository, userRepository) {
        this.fgpRepository = fgpRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.fgpRepository.fgps.find();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::ForgotPassService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const fgp = await this.fgpRepository.fgps.findOneByID(id);
            if (fgp) {
                return fgp;
            }
            throw new common_1.NotFoundException('fgp not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::ForgotPassService.fetchOne');
            throw error;
        }
    }
    async add(data) {
        try {
            let { code, email } = data;
            const codes = Math.floor(100000 + Math.random() * 900000).toString();
            const user = await this.userRepository.users.findOne({
                where: { email: email }
            });
            if (!user) {
                throw new common_1.NotFoundException("Aucun utilisateur avec cet email");
            }
            const existingForgotPasses = await this.fgpRepository.fgps.find({
                where: { email: email }
            });
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Récupération de mot de passe',
                text: `Voici votre code de réinitialisation de mot de passe : ${codes}`,
            };
            code = codes;
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Erreur lors de l\'envoi de l\'email:', error);
                }
                else {
                    console.log('Email envoyé:', info.response);
                }
            });
            return await this.fgpRepository.fgps.create(await fgp_factory_1.ForgotPassFactory.create(data));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::ForgotPassService.add');
            throw error;
        }
    }
    async remove(id) {
        try {
            const fgp = await this.fgpRepository.fgps.findOneByID(id);
            if (fgp) {
                return await this.fgpRepository.fgps.remove(fgp).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::ForgotPassService.remove');
            return false;
        }
    }
    async verifyCode(data) {
        try {
            const { code, email } = data;
            const fgp = await this.fgpRepository.fgps.findOne({
                where: {
                    code: code,
                    email: email,
                },
                order: {
                    createdAt: 'DESC',
                },
            });
            if (!fgp) {
                throw new common_1.BadRequestException("Code incorrecte");
            }
            return true;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::ForgotPassService.remove');
        }
    }
};
ForgotPassService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_2.IForgotPassRepository,
        domain_1.IUserRepository])
], ForgotPassService);
exports.ForgotPassService = ForgotPassService;
//# sourceMappingURL=fgp.service.js.map