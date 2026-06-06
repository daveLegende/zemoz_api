import { Poule } from '../../domain';
import { ICreatePouleDTO, IUpdatePouleDTO } from '../dto';

export abstract class IPouleService {
  abstract add(data: ICreatePouleDTO): Promise<Poule>;

  abstract fetchAll(): Promise<Poule[]>;

  abstract fetchOne(id: string): Promise<Poule>;

  abstract edit(data: IUpdatePouleDTO): Promise<Poule>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Poule>): Promise<Poule>;

  abstract remove(id: string): Promise<boolean>;
}
