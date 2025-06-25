import { Server } from 'socket.io';
import { UpdateMatchScoreEventDto, UpdateStateDto } from '../dto';
import { IMatchService } from 'src/match/app/module';
import { ICouponService } from 'src/coupon/app/module';
export declare class MatchGateway {
    private readonly matchService;
    private readonly couponService;
    server: Server;
    constructor(matchService: IMatchService, couponService: ICouponService);
    handleScoreUpdate(updateScoreDto: UpdateMatchScoreEventDto): Promise<void>;
    handleStateUpdate(updateStateDto: UpdateStateDto): Promise<void>;
    handleListenForUpdates(client: any): Promise<void>;
    private handleCustomState;
}
