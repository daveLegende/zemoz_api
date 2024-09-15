/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IIDParamDTO } from 'app/dto';
import { Prononstic } from 'src/prononstic/domain';
import { ICreatePronosDTO, IUpdatePronosDTO } from '../dto';
export abstract class IPrononsticController {
  abstract all(): Promise<Prononstic[]>;

  abstract show(param: IIDParamDTO): Promise<Prononstic>;

  abstract create(data: ICreatePronosDTO, file?: any): Promise<Prononstic>;

  abstract update(data: IUpdatePronosDTO, file?: any): Promise<Prononstic>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
