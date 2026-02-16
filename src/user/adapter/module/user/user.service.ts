import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserFactory } from 'user/adapter/user.factory';
import {
  ChangePassAccountDTO,
  DeleteUserBetDTO,
  DeleteUserTicketDTO,
  ForgotPasswordDTO,
  RegisterAccoutDTO,
  ReinitialisePassAccountDTO,
  UpdateUserDTO,
  UserAccoutDTO,
  UserRegisterDTO,
} from 'user/adapter/dto/user.input.dto';
import { IUserService } from 'user/app/module/user';
import { User } from 'user/domain';
import { IUserRepository } from 'user/domain/data.abstract';import { HashFactory } from 'user/adapter/guard/hash.factory';
import { ITicketRepository, Ticket } from 'src/ticket/domain';
import { Coupon } from 'src/coupon/domain';
import { ICouponRepository } from 'src/coupon/domain/data.abstract';
import { CouponFactory } from 'src/coupon/adapter/coupon.factory';
import { Paris } from 'src/paris/domain';
import { IParisRepository } from 'src/paris/domain/data.abstract';
import { TournoiCoupon } from 'src/tournoiCoupon/domain';
import { ITournoiCouponRepository } from 'src/tournoiCoupon/domain/data.abstract';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger();
  constructor(
    private userRepository: IUserRepository,
    private parisRepository: IParisRepository,
    private ticketRepository: ITicketRepository,
    private couponRepository: ICouponRepository,
    private tournoiCouponRepository: ITournoiCouponRepository,
  ) {}

  async fetchAll(): Promise<User[]> {
    try {
      return await this.userRepository.users.find();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.users.findOneByID(id);
      if (user) {
        return user;
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchOne');
      throw error;
    }
  }

  async search(data: Partial<User>): Promise<User> {
    return await this.userRepository.users.findOneBy({ ...data });
  }

  async add(data: UserRegisterDTO): Promise<User> {
    try {
      const { phone, email, password, confirmPass } = data;

      // Vérification supplémentaire que les mots de passe correspondent
      if (password !== confirmPass) {
        throw new BadRequestException('Les mots de passe ne correspondent pas');
      }
      const existed = await this.userRepository.users.findOneBy({ phone });
      if (existed)
        throw new ConflictException('User account email allready exist');
      return await this.userRepository.users.create(
        await UserFactory.create(data),
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.add');
      throw error;
    }
  }

  async edit(data: UpdateUserDTO): Promise<User> {
    try {
      const { id } = data;
      const user = id && (await this.userRepository.users.findOneByID(id));
      if (user) {
        return await this.userRepository.users.update(
          UserFactory.update(user, data),
        );
      }
      throw new NotFoundException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.editUser');

      throw error;
    }
  }

  async setState(id: string): Promise<boolean> {
    try {
      const user = id && (await this.userRepository.users.findOneByID(id));
      if (user) {
        user.isActivated = !user.isActivated;
        return await this.userRepository.users.update(user).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.setState');
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const user = await this.userRepository.users.findOneByID(id);
      if (user) {
        return await this.userRepository.users.remove(user).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.remove');
      return false;
    }
  }

  
  async fetchByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.users.findOne({
        where: { email: email }
      });

      if (!user) {
        throw new NotFoundException("Aucun utilisateur avec cet email");
      }

      return user;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchByEmail');
      return error;
    }
  }

  async fetchByPhone(phone: string): Promise<User> {
    try {
      const user = await this.userRepository.users.findOne({
        where: { phone: phone }
      });

      if (!user) {
        throw new NotFoundException("Aucun utilisateur avec ce numero de téléphone");
      }

      return user;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
      return error;
    }
  }

  
  async reinitialisePass(data: ReinitialisePassAccountDTO): Promise<User> {
    try {
      const { email, password, confirm  } = data;

      const user = await this.userRepository.users.findOneBy({email});

      if (password.length < 6 || !password || !confirm || !email) {
        throw new BadRequestException("Données invalides")
      }
      if (!user) {
        throw new NotFoundException("Aucun utilisateur avec cet email");
      }

      if (password !== confirm) {
        throw new BadRequestException("Mot de passe incorrecte")
      }

      const hashPass = await HashFactory.hashPwd(password);

      user.password = hashPass;

      await this.userRepository.users.update(user);

      return user;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
      return error;
    }
  }


  async changePass(data: ChangePassAccountDTO): Promise<User> {
    try {
      const { id, oldpass, newpass, confirm  } = data;

      const userE = await this.userRepository.users.findOneByID(id);

      if (newpass.length < 6 || !oldpass|| !newpass || !confirm) {
        throw new BadRequestException("Données invalides")
      }
      if (!userE) {
        throw new NotFoundException("Aucun utilisateur trouvé");
      }

      const matchOld = await HashFactory.isRightPwd(oldpass, userE.password);
      if (!matchOld) {
        throw new BadRequestException("Ancien mot de passe invalide")
      }

      if (newpass !== confirm) {
        throw new BadRequestException("Nouveau mot de passe incorrecte")
      }

      const hashPass = await HashFactory.hashPwd(newpass);

      userE.password = hashPass;

      await this.userRepository.users.update(userE);

      return userE;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
      return error;
    }
  }

  // 
  async getUserTickets(id: string): Promise<Ticket[]> {
    try {
      const user = await this.userRepository.users.findOneByID(id);

      if (!user) {
        throw new NotFoundException("Utilisateur non trouvé");
      }
      console.log("wsugsdhfligywsilhvi "+user);
      
      const tickets = await this.ticketRepository.tickets.find({
        where: { 
          user: { id: user.id },
          isDeleted: false,
       },
        relations: { user: true }
      });

      return tickets;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
      return error;
    }
  }

  async deleteUserTicket(data: DeleteUserTicketDTO): Promise<boolean> {
    try {
      const { id, userId } = data;
      const user = await this.userRepository.users.findOneByID(userId);

      if (!user) {
        throw new NotFoundException("Utilisateur non trouvé");
      }
      const ticket = await this.ticketRepository.tickets.findOne(
        {
          where: { 
            id: id,
            user: { id: user.id },
        },
          relations: { user: true }
        }
      );
      if (ticket) {
        ticket.isDeleted = true;
        return await this.ticketRepository.tickets.update(ticket).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.remove');
      return false;
    }
  }
  // 
  async getUserBets(id: string): Promise<Coupon[]> {
    try {
      const user = await this.userRepository.users.findOneByID(id);

      if (!user) {
        throw new NotFoundException("Utilisateur non trouvé");
      }
      console.log("wsugsdhfligywsilhvi "+user);
      
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
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
      return error;
    }
  }

  async getUserParis(id: string): Promise<Paris[]> {
    try {
      const user = await this.userRepository.users.findOneByID(id);

      if (!user) {
        throw new NotFoundException("Utilisateur non trouvé");
      }
      
      const paris = await this.parisRepository.paris.find({
        where: { 
          user: { id: user.id } as User,
          // isDeleted: false,
       },
        relations: { 
          user: true,
        }
      });

      return paris;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
      return error;
    }
  }

  async getUserTournoiCoupons(id: string): Promise<TournoiCoupon[]> {
    try {
      const user = await this.userRepository.users.findOneByID(id);

      if (!user) {
        throw new NotFoundException("Utilisateur non trouvé");
      }
      
      const tournoiCoupons = await this.tournoiCouponRepository.tournoiCoupons.find({
        where: { 
          user: { id: user.id } as User,
       },
        relations: { 
          user: true,
        }
      });

      return tournoiCoupons;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
      return error;
    }
  }

  async deleteUserBet(data: DeleteUserBetDTO): Promise<boolean> {
    try {
      const { id, userId } = data;
      const user = await this.userRepository.users.findOneByID(userId);

      if (!user) {
        throw new NotFoundException("Utilisateur non trouvé");
      }
      const coupon = await this.couponRepository.coupons.findOne(
        {
          where: { 
            id: id,
            user: { id: user.id },
        },
          relations: { user: true }
        }
      );
      if (coupon) {
        coupon.isDeleted = true;
        return await this.couponRepository.coupons.update(
          await CouponFactory.update(coupon, data),
        ).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.remove');
      return false;
    }
  }

  // 
  async getCurrentUser(id: string): Promise<User> {
    try {
      // const { id } = data;
      const user = await this.userRepository.users.findOne({
        where: { id: id },
        // relations: { ticket: true }
      });

      if (!user) {
        throw new NotFoundException("Aucun utilisateur avec ce numero de téléphone");
      }

      return user;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchByPhone');
      return error;
    }
  }
}
