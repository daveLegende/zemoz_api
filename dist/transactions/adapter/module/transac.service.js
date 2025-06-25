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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const transac_factory_1 = require("../transac.factory");
const domain_1 = require("../../domain");
const domain_2 = require("../../../user/domain");
const domain_3 = require("../../../admin/domain");
const hash_factory_1 = require("../../../admin/adapter/guard/hash.factory");
const typeorm_1 = require("@nestjs/typeorm");
const pwd_entity_1 = require("../../../password/entity/pwd.entity");
const typeorm_2 = require("typeorm");
let TransactionService = class TransactionService {
    constructor(transactionRepository, userRepository, adminRepository, passwordRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.passwordRepository = passwordRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.transactionRepository.transactions.find({
                relations: { admin: true }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TransactionService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const Transaction = await this.transactionRepository.transactions.findOne({
                where: { id },
                relations: { admin: true }
            });
            if (Transaction) {
                return Transaction;
            }
            throw new common_1.NotFoundException('Transaction not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TransactionService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.transactionRepository.transactions.findOneBy(Object.assign({}, data));
    }
    async add(data, pass) {
        try {
            const { type, phone, admin, amount } = data;
            if (!type || !phone || !amount)
                throw new common_1.BadRequestException("Invalid crédentials");
            const adminE = await this.adminRepository.admins.findOneByID(admin);
            const userE = await this.userRepository.users.findOneBy({ phone });
            const pwd = await this.passwordRepository.find();
            if (!userE)
                throw new common_1.NotFoundException("User non trouvé");
            if (!adminE)
                throw new common_1.NotFoundException("Admin non trouvé");
            if (amount < 500)
                throw new common_1.BadRequestException("Le montant doit être super ou égal à 500frs");
            const verifyPass = await hash_factory_1.HashFactory.isRightPwd(pass.pass, pwd[0].pass);
            if (!verifyPass)
                throw new common_1.BadRequestException("Mot de pass incorrecte");
            if (type === domain_1.TransactionType.DEPOT) {
                userE.solde += amount;
                const transac = await this.transactionRepository.transactions.create(await transac_factory_1.TransactionFactory.create(data, adminE));
                await this.userRepository.users.update(userE);
                return transac;
            }
            else {
                if (userE.solde < amount)
                    throw new common_1.BadRequestException("Solde insuffisant");
                userE.solde -= amount;
                const transac = await this.transactionRepository.transactions.create(await transac_factory_1.TransactionFactory.create(data, adminE));
                await this.userRepository.users.update(userE);
                return transac;
            }
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TransactionService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const transaction = id && (await this.transactionRepository.transactions.findOneByID(id));
            if (transaction) {
                return await this.transactionRepository.transactions.update(transac_factory_1.TransactionFactory.update(transaction, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TransactionService.editTransaction');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const transaction = await this.transactionRepository.transactions.findOneByID(id);
            if (transaction) {
                return await this.transactionRepository.transactions.remove(transaction).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TransactionService.remove');
            return false;
        }
    }
    async userTransac(data) {
        try {
            return;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TransactionService.add');
            throw error;
        }
    }
    ;
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(pwd_entity_1.PasswordEntity)),
    __metadata("design:paramtypes", [domain_1.ITransactionRepository,
        domain_2.IUserRepository,
        domain_3.IAdminRepository,
        typeorm_2.Repository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transac.service.js.map