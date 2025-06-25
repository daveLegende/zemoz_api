import { ATimestamp } from 'framework/timestamp.abstract';
import { User } from 'user/domain';
import { SexEnum } from 'user/domain';
import { PrononsticEntity } from 'src/prononstic/framework/database/schema/prono.entity';
import { TicketEntity } from 'src/ticket/framework/database/schema/ticket.entity';
import { CouponEntity } from 'src/coupon/framework/schema/coupon.entity';
import { TransactionEntity } from 'src/transactions/framework/database/schema/transac.entity';
import { ParisEntity } from 'src/paris/framework/schema/paris.entity';
export declare class UserEntity extends ATimestamp implements User {
    id: string;
    firstname: string;
    lastname: string;
    email?: string;
    phone: string;
    solde: number;
    sex: SexEnum;
    country: string;
    isActivated: boolean;
    password: string;
    askForReset: boolean;
    avatar: string;
    pronostics: PrononsticEntity[];
    tickets: TicketEntity[];
    bets?: CouponEntity[];
    paris?: ParisEntity[];
    transactions?: TransactionEntity[];
}
