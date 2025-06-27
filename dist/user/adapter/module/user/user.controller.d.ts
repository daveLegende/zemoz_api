import { IDParamDTO } from 'adapter/dto';
import { IUserController, IUserService } from 'user/app/module/user';
import { User } from 'user/domain/user.model';
import { UpdateUserDTO, UserQueryDTO, ReinitialisePassAccountDTO, ChangePassAccountDTO, DeleteUserBetDTO, DeleteUserTicketDTO, UserRegisterDTO } from 'user/adapter/dto';
import { Ticket } from 'src/ticket/domain';
import { Coupon } from 'src/coupon/domain';
import { Paris } from 'src/paris/domain';
export declare class UserController implements IUserController {
    private readonly userService;
    constructor(userService: IUserService);
    getCurrentUser({ id }: IDParamDTO): Promise<User>;
    getProfile(req: any): Promise<User>;
    all(): Promise<User[]>;
    signinByToken(user: User): Promise<User>;
    search(param: UserQueryDTO): Promise<User>;
    show({ id }: IDParamDTO): Promise<User>;
    create(data: UserRegisterDTO): Promise<User>;
    update(data: UpdateUserDTO): Promise<User>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
    reinitialisePass(data: ReinitialisePassAccountDTO): Promise<User>;
    changePass(data: ChangePassAccountDTO): Promise<User>;
    getUserTickets({ id }: IDParamDTO): Promise<Ticket[]>;
    getUserBets({ id }: IDParamDTO): Promise<Coupon[]>;
    getUserParis({ id }: IDParamDTO): Promise<Paris[]>;
    deleteUserBet(data: DeleteUserBetDTO): Promise<boolean>;
    deleteUserTicket(data: DeleteUserTicketDTO): Promise<boolean>;
}
