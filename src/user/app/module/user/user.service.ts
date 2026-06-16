import { Coupon } from '../../../../coupon/domain';
import { Paris } from '../../../../paris/domain';
import { Ticket } from '../../../../ticket/domain';
import { TournoiCoupon } from '../../../../tournoiCoupon/domain';
import { IChangePasswordDTO, ICreateUserDTO, IDeleteUserBetOrTicketDTO, IReinitialisePassDTO, IUpdateUserDTO } from '../../dto';
import { User } from '../../../domain';

export abstract class IUserService {
  abstract getCurrentUser(id: string): Promise<User>

  abstract add(data: ICreateUserDTO): Promise<User>;

  abstract fetchAll(): Promise<User[]>;

  abstract fetchOne(id: string): Promise<User>;

  abstract edit(data: IUpdateUserDTO): Promise<User>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<User>): Promise<User>;

  abstract remove(id: string): Promise<boolean>;

  abstract fetchByPhone(phone: string): Promise<User>;

  abstract fetchByEmail(email: string): Promise<User>;

  abstract reinitialisePass(data: IReinitialisePassDTO): Promise<User>;

  abstract changePass(data: IChangePasswordDTO): Promise<User>;

  abstract getUserTickets(id: string): Promise<Ticket[]>;

  abstract getUserBets(id: string): Promise<Coupon[]>;

  abstract getUserParis(id: string): Promise<Paris[]>;

  abstract deleteUserBet(data: IDeleteUserBetOrTicketDTO): Promise<boolean>;

  abstract getUserTournoiCoupons(id: string): Promise<TournoiCoupon[]>;

  abstract deleteUserTicket(data: IDeleteUserBetOrTicketDTO): Promise<boolean>;

}
