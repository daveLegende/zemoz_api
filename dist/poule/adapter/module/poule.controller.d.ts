/// <reference types="multer" />
import { IDParamDTO } from 'adapter/dto';
import { IPouleController, IPouleService } from 'src/poule/app/module';
import { Poule } from 'src/poule/domain';
import { UpdatePouleDTO } from 'src/poule/adapter/dto';
import { PouleAccountDto } from '../dto';
export declare class PouleController implements IPouleController {
    private readonly pouleService;
    constructor(pouleService: IPouleService);
    all(): Promise<Poule[]>;
    search(param: Poule): Promise<Poule>;
    show({ id }: IDParamDTO): Promise<Poule>;
    create(data: PouleAccountDto): Promise<Poule>;
    update(data: UpdatePouleDTO, file: Express.Multer.File): Promise<Poule>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
