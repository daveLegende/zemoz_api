/// <reference types="multer" />
import { IDParamDTO } from 'adapter/dto';
import { IArbitreController, IArbitreService } from 'src/arbitre/app/module';
import { Arbitre } from 'src/arbitre/domain';
import { ArbitreAccountDto, UpdateArbitreDTO } from '../dto';
export declare class ArbitreController implements IArbitreController {
    private readonly arbitreService;
    constructor(arbitreService: IArbitreService);
    all(): Promise<Arbitre[]>;
    search(param: ArbitreAccountDto): Promise<Arbitre>;
    show({ id }: IDParamDTO): Promise<Arbitre>;
    create(data: ArbitreAccountDto, file: Express.Multer.File): Promise<Arbitre>;
    update(data: UpdateArbitreDTO, file: Express.Multer.File): Promise<Arbitre>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
