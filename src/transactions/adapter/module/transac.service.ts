import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TransactionFactory } from '../transac.factory';
import { ITransactionService } from '../../../transactions/app/module';
import { ITransactionRepository, Transaction, TransactionType } from '../../../transactions/domain';
import { PassAccountDto, TransactionAccountDto, UpdateTransactionDTO } from '../dto';
import { IUserRepository } from '../../../user/domain';
import { IAdminRepository } from '../../../admin/domain';
import { HashFactory } from '../../../admin/adapter/guard/hash.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordEntity } from '../../../password/entity/pwd.entity';
import { Repository } from 'typeorm';
  
  @Injectable()
  export class TransactionService implements ITransactionService {
    private readonly logger = new Logger();
    constructor(
      private transactionRepository: ITransactionRepository,
      private userRepository: IUserRepository,
      private adminRepository: IAdminRepository,
      @InjectRepository(PasswordEntity)
      private passwordRepository: Repository<PasswordEntity>,
    ) {}
  
    async fetchAll(): Promise<Transaction[]> {
      try {
        return await this.transactionRepository.transactions.find({
          relations: { admin: true }
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TransactionService.fetchAll');
        throw error;
      }
    }
  
    async fetchOne(id: string): Promise<Transaction> {
      try {
        const Transaction = await this.transactionRepository.transactions.findOne({
          where: {id},
          relations: { admin: true }
        });
        if (Transaction) {
          return Transaction;
        }
        throw new NotFoundException('Transaction not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TransactionService.fetchOne');
        throw error;
      }
    }
  
    async search(data: Partial<Transaction>): Promise<Transaction> {
      // const Transaction = new Transaction()
      return await this.transactionRepository.transactions.findOneBy({ ...data });
    }
  
    async add(data: TransactionAccountDto, pass: PassAccountDto): Promise<Transaction> {
      try {
        const { type, phone, admin, amount } = data;
        if (!type || !phone || !amount) throw new BadRequestException("Invalid crédentials");

        const adminE = await this.adminRepository.admins.findOneByID(admin);
        const userE = await this.userRepository.users.findOneBy({phone});
        // const pwd = await this.passwordRepository.find();
        
        if(!userE) throw new NotFoundException("User non trouvé");
        
        if(!adminE) throw new NotFoundException("Admin non trouvé");

        if (amount < 500) throw new BadRequestException("Le montant doit être super ou égal à 500frs");
        
        // const verifyPass = await HashFactory.isRightPwd(pass.pass, pwd[0].pass);

        // if (!verifyPass) throw new BadRequestException("Mot de pass incorrecte");

        const pourcentage = amount * (2/100);

        if (type === TransactionType.DEPOT) {
          userE.solde += amount - pourcentage;
          data.frais = pourcentage;
          const transac = await this.transactionRepository.transactions.create(
            await TransactionFactory.create(data, adminE, userE),
          );
          await this.userRepository.users.update(userE);
          return transac;
        } else {
          if (userE.solde < amount) throw new BadRequestException("Solde insuffisant");
          userE.solde -= amount;
          const transac = await this.transactionRepository.transactions.create(
            await TransactionFactory.create(data, adminE, userE),
          );
          await this.userRepository.users.update(userE);
          return transac;
        }
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TransactionService.add');
        throw error;
      }
    }
  
    async edit(data: UpdateTransactionDTO): Promise<Transaction> {
      try {
        const { id } = data;
        const transaction = id && (await this.transactionRepository.transactions.findOneByID(id));
        if (transaction) {
          return await this.transactionRepository.transactions.update(
            TransactionFactory.update(transaction, data),
          );
        }
        throw new NotFoundException();
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TransactionService.editTransaction');
  
        throw error;
      }
    }
  
    async setState(id: string): Promise<boolean> {
      return false;
    }
  
    async remove(id: string): Promise<boolean> {
      try {
        const transaction = await this.transactionRepository.transactions.findOneByID(id);
        if (transaction) {
          return await this.transactionRepository.transactions.remove(transaction).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TransactionService.remove');
        return false;
      }
    }

    async userTransac(data: TransactionAccountDto): Promise<Transaction> {
      try {
        return ;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TransactionService.add');
        throw error;
      }
    };
  }
  