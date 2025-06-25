import { IArbitreService } from 'src/arbitre/app/module';
import { Arbitre, IArbitreRepository } from 'src/arbitre/domain';
import { ArbitreAccountDto, UpdateArbitreDTO } from '../dto';
export declare class ArbitreService implements IArbitreService {
    private arbitresRepository;
    private readonly logger;
    constructor(arbitresRepository: IArbitreRepository);
    fetchAll(): Promise<Arbitre[]>;
    fetchOne(id: string): Promise<Arbitre>;
    search(data: Partial<Arbitre>): Promise<Arbitre>;
    add(data: ArbitreAccountDto): Promise<Arbitre>;
    edit(data: UpdateArbitreDTO): Promise<Arbitre>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
