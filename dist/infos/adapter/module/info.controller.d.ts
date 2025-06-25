/// <reference types="multer" />
import { IDParamDTO } from 'adapter/dto';
import { IInfoController, IInfoService } from 'src/infos/app/module';
import { Info } from 'src/infos/domain';
import { InfoAccountDto, UpdateInfoDTO } from '../dto';
export declare class InfoController implements IInfoController {
    private readonly infoService;
    constructor(infoService: IInfoService);
    all(): Promise<Info[]>;
    search(param: Info): Promise<Info>;
    show({ id }: IDParamDTO): Promise<Info>;
    create(data: InfoAccountDto, file: Express.Multer.File): Promise<Info>;
    update(data: UpdateInfoDTO, file: Express.Multer.File): Promise<Info>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
