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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_factory_1 = require("../../user.factory");
const data_abstract_1 = require("../../../domain/data.abstract");
const hash_factory_1 = require("../../guard/hash.factory");
const domain_1 = require("../../../../ticket/domain");
const data_abstract_2 = require("../../../../coupon/domain/data.abstract");
const coupon_factory_1 = require("../../../../coupon/adapter/coupon.factory");
const data_abstract_3 = require("../../../../paris/domain/data.abstract");
let UserService = class UserService {
    constructor(userRepository, parisRepository, ticketRepository, couponRepository) {
        this.userRepository = userRepository;
        this.parisRepository = parisRepository;
        this.ticketRepository = ticketRepository;
        this.couponRepository = couponRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.userRepository.users.find();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const user = await this.userRepository.users.findOneByID(id);
            if (user) {
                return user;
            }
            throw new common_1.NotFoundException('User not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.userRepository.users.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { phone, email, password, confirmPass } = data;
            if (password !== confirmPass) {
                throw new common_1.BadRequestException('Les mots de passe ne correspondent pas');
            }
            const existed = await this.userRepository.users.findOneBy({ phone });
            if (existed)
                throw new common_1.ConflictException('User account email allready exist');
            return await this.userRepository.users.create(await user_factory_1.UserFactory.create(data));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const user = id && (await this.userRepository.users.findOneByID(id));
            if (user) {
                return await this.userRepository.users.update(user_factory_1.UserFactory.update(user, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.editUser');
            throw error;
        }
    }
    async setState(id) {
        try {
            const user = id && (await this.userRepository.users.findOneByID(id));
            if (user) {
                user.isActivated = !user.isActivated;
                return await this.userRepository.users.update(user).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.setState');
            return false;
        }
    }
    async remove(id) {
        try {
            const user = await this.userRepository.users.findOneByID(id);
            if (user) {
                return await this.userRepository.users.remove(user).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.remove');
            return false;
        }
    }
    async fetchByEmail(email) {
        try {
            const user = await this.userRepository.users.findOne({
                where: { email: email }
            });
            if (!user) {
                throw new common_1.NotFoundException("Aucun utilisateur avec cet email");
            }
            return user;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.fetchByEmail');
            return error;
        }
    }
    async fetchByPhone(phone) {
        try {
            const user = await this.userRepository.users.findOne({
                where: { phone: phone }
            });
            if (!user) {
                throw new common_1.NotFoundException("Aucun utilisateur avec ce numero de téléphone");
            }
            return user;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
            return error;
        }
    }
    async reinitialisePass(data) {
        try {
            const { email, password, confirm } = data;
            const user = await this.userRepository.users.findOneBy({ email });
            if (password.length < 6 || !password || !confirm || !email) {
                throw new common_1.BadRequestException("Données invalides");
            }
            if (!user) {
                throw new common_1.NotFoundException("Aucun utilisateur avec cet email");
            }
            if (password !== confirm) {
                throw new common_1.BadRequestException("Mot de passe incorrecte");
            }
            const hashPass = await hash_factory_1.HashFactory.hashPwd(password);
            user.password = hashPass;
            await this.userRepository.users.update(user);
            return user;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
            return error;
        }
    }
    async changePass(data) {
        try {
            const { id, oldpass, newpass, confirm } = data;
            const userE = await this.userRepository.users.findOneByID(id);
            if (newpass.length < 6 || !oldpass || !newpass || !confirm) {
                throw new common_1.BadRequestException("Données invalides");
            }
            if (!userE) {
                throw new common_1.NotFoundException("Aucun utilisateur trouvé");
            }
            const matchOld = await hash_factory_1.HashFactory.isRightPwd(oldpass, userE.password);
            if (!matchOld) {
                throw new common_1.BadRequestException("Ancien mot de passe invalide");
            }
            if (newpass !== confirm) {
                throw new common_1.BadRequestException("Nouveau mot de passe incorrecte");
            }
            const hashPass = await hash_factory_1.HashFactory.hashPwd(newpass);
            userE.password = hashPass;
            await this.userRepository.users.update(userE);
            return userE;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
            return error;
        }
    }
    async getUserTickets(id) {
        try {
            const user = await this.userRepository.users.findOneByID(id);
            if (!user) {
                throw new common_1.NotFoundException("Utilisateur non trouvé");
            }
            console.log("wsugsdhfligywsilhvi " + user);
            const tickets = await this.ticketRepository.tickets.find({
                where: {
                    user: { id: user.id },
                    isDeleted: false,
                },
                relations: { user: true }
            });
            return tickets;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
            return error;
        }
    }
    async deleteUserTicket(data) {
        try {
            const { id, userId } = data;
            const user = await this.userRepository.users.findOneByID(userId);
            if (!user) {
                throw new common_1.NotFoundException("Utilisateur non trouvé");
            }
            const ticket = await this.ticketRepository.tickets.findOne({
                where: {
                    id: id,
                    user: { id: user.id },
                },
                relations: { user: true }
            });
            if (ticket) {
                ticket.isDeleted = true;
                return await this.ticketRepository.tickets.update(ticket).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.remove');
            return false;
        }
    }
    async getUserBets(id) {
        try {
            const user = await this.userRepository.users.findOneByID(id);
            if (!user) {
                throw new common_1.NotFoundException("Utilisateur non trouvé");
            }
            console.log("wsugsdhfligywsilhvi " + user);
            const coupons = await this.couponRepository.coupons.find({
                where: {
                    user: { id: user.id },
                    isDeleted: false,
                },
                relations: {
                    user: true,
                    couponBets: {
                        bet: {
                            match: {
                                home: true,
                                away: true,
                            },
                        },
                    },
                }
            });
            return coupons;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
            return error;
        }
    }
    async getUserParis(id) {
        try {
            const user = await this.userRepository.users.findOneByID(id);
            if (!user) {
                throw new common_1.NotFoundException("Utilisateur non trouvé");
            }
            const paris = await this.parisRepository.paris.find({
                where: {
                    user: { id: user.id },
                },
                relations: {
                    user: true,
                }
            });
            return paris;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
            return error;
        }
    }
    async deleteUserBet(data) {
        try {
            const { id, userId } = data;
            const user = await this.userRepository.users.findOneByID(userId);
            if (!user) {
                throw new common_1.NotFoundException("Utilisateur non trouvé");
            }
            const coupon = await this.couponRepository.coupons.findOne({
                where: {
                    id: id,
                    user: { id: user.id },
                },
                relations: { user: true }
            });
            if (coupon) {
                coupon.isDeleted = true;
                return await this.couponRepository.coupons.update(await coupon_factory_1.CouponFactory.update(coupon, data)).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.remove');
            return false;
        }
    }
    async getCurrentUser(id) {
        try {
            const user = await this.userRepository.users.findOne({
                where: { id: id },
            });
            if (!user) {
                throw new common_1.NotFoundException("Aucun utilisateur avec ce numero de téléphone");
            }
            return user;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
            return error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_abstract_1.IUserRepository,
        data_abstract_3.IParisRepository,
        domain_1.ITicketRepository,
        data_abstract_2.ICouponRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map