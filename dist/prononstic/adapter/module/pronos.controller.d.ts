import { IDParamDTO } from 'adapter/dto';
import { PrononsticAccoutDTO, UpdatePrononsticDTO } from '../dto';
import { IPrononsticController, IPrononsticService } from 'src/prononstic/app/module';
import { Prononstic } from 'src/prononstic/domain';
export declare class PrononsticController implements IPrononsticController {
    private readonly pronoService;
    constructor(pronoService: IPrononsticService);
    all(): Promise<Prononstic[]>;
    show({ id }: IDParamDTO): Promise<Prononstic>;
    create(data: PrononsticAccoutDTO): Promise<Prononstic>;
    update(data: UpdatePrononsticDTO): Promise<Prononstic>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
