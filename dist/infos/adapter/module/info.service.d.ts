import { InfoAccountDto, UpdateInfoDTO } from '../dto';
import { IInfoService } from 'src/infos/app/module';
import { IInfoRepository, Info } from 'src/infos/domain';
export declare class InfoService implements IInfoService {
    private infoRepository;
    private readonly logger;
    constructor(infoRepository: IInfoRepository);
    fetchAll(): Promise<Info[]>;
    fetchOne(id: string): Promise<Info>;
    search(data: Partial<Info>): Promise<Info>;
    add(data: InfoAccountDto): Promise<Info>;
    edit(data: UpdateInfoDTO): Promise<Info>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
