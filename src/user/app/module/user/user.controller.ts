/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IIDParamDTO } from '../../../../_shared/app/dto';

import { Coupon } from '../../../../coupon/domain';
import { Paris } from '../../../../paris/domain';
import { Ticket } from '../../../../ticket/domain';
import { TournoiCoupon } from '../../../../tournoiCoupon/domain';
import {
  DeleteUserBetDTO,
  DeleteUserTicketDTO,
} from '../../../../user/adapter/dto';
import {
  IChangePasswordDTO,
  ICreateUserDTO,
  IReinitialisePassDTO,
  IUpdateUserDTO,
} from '../../../../user/app/dto/user.input.dto';
import { User } from '../../../../user/domain/user.model';

export abstract class IUserController {
  abstract getCurrentUser(param: IIDParamDTO, file?: any): Promise<User>;

  abstract all(): Promise<User[]>;

  abstract show(param: IIDParamDTO): Promise<User>;

  abstract create(data: ICreateUserDTO, file?: any): Promise<User>;

  abstract search(data: Partial<User>, file?: any): Promise<User>;

  abstract update(data: IUpdateUserDTO, file?: any): Promise<User>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract reinitialisePass(
    data: IReinitialisePassDTO,
    file?: any,
  ): Promise<User>;

  abstract changePass(data: IChangePasswordDTO, file?: any): Promise<User>;

  abstract getUserTickets(param: IIDParamDTO): Promise<Ticket[]>;

  abstract getUserBets(param: IIDParamDTO): Promise<Coupon[]>;

  abstract getUserTournoiCoupons(param: IIDParamDTO): Promise<TournoiCoupon[]>;

  abstract getUserParis(param: IIDParamDTO): Promise<Paris[]>;

  abstract deleteUserBet(data: DeleteUserBetDTO, file?: any): Promise<boolean>;

  abstract deleteUserTicket(
    data: DeleteUserTicketDTO,
    file?: any,
  ): Promise<boolean>;
}
