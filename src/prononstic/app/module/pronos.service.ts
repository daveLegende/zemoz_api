import { Prononstic } from '../../domain';
import { ICreatePronosDTO, IUpdatePronosDTO } from '../dto';

export abstract class IPrononsticService {
  abstract add(data: ICreatePronosDTO): Promise<Prononstic>;

  abstract fetchAll(): Promise<Prononstic[]>;

  abstract fetchOne(id: string): Promise<Prononstic>;

  abstract edit(data: IUpdatePronosDTO): Promise<Prononstic>;

  abstract remove(id: string): Promise<boolean>;
}
