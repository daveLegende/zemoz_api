/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IIDParamDTO } from 'app/dto';
import { Player } from 'src/player/domain';
import { ICreatePlayerDTO, IUpdatePlayerDTO } from '../dto';

export abstract class IPlayerController {
  abstract all(): Promise<Player[]>;

  abstract show(param: IIDParamDTO): Promise<Player>;

  abstract create(data: ICreatePlayerDTO, file?: any): Promise<Player>;

  abstract search(data: Partial<Player>, file?: any): Promise<Player>;

  abstract update(data: IUpdatePlayerDTO, file?: any): Promise<Player>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
