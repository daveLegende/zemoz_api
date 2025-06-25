import { IDParamDTO } from 'adapter/dto';
import { IParisController, IParisService } from 'src/paris/app/module';
import { Paris } from 'src/paris/domain';
import { ParisAccountDto, UpdateParisDTO } from '../dto';
export declare class ParisController implements IParisController {
    private readonly parisService;
    constructor(parisService: IParisService);
    all(): Promise<Paris[]>;
    search(param: Paris): Promise<Paris>;
    show({ id }: IDParamDTO): Promise<Paris>;
    create(data: ParisAccountDto): Promise<Paris>;
    update(data: UpdateParisDTO): Promise<Paris>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
