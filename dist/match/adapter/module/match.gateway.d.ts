import { Server } from 'socket.io';
import { UpdateMatchScoreEventDto, UpdateStateDto } from '../dto';
import { IMatchService } from 'src/match/app/module';
import { ICouponService } from 'src/coupon/app/module';
import { IUserService } from 'user/app/module/user';
import { IParisService } from 'src/paris/app/module';
import { EntityManager } from 'typeorm';
export declare class MatchGateway {
    private readonly matchService;
    private readonly couponService;
    private readonly parisService;
    private entityManager;
    private readonly userService;
    server: Server;
    constructor(matchService: IMatchService, couponService: ICouponService, parisService: IParisService, entityManager: EntityManager, userService: IUserService);
    handleScoreUpdate(updateScoreDto: UpdateMatchScoreEventDto): Promise<void>;
    handleStateUpdate(updateStateDto: UpdateStateDto): Promise<void>;
    handleListenForUpdates(client: any): Promise<void>;
    private handleCustomState;
}
