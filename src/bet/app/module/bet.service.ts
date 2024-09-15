import { Bet } from "src/bet/domain";
import { ICreateBetDTO, IUpdateBetDTO } from "../dto";


export abstract class IBetService {
  abstract add(data: ICreateBetDTO): Promise<Bet>;

  abstract fetchAll(): Promise<Bet[]>;

  abstract fetchOne(id: string): Promise<Bet>;

  abstract edit(data: IUpdateBetDTO): Promise<Bet>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Bet>): Promise<Bet>;

  abstract remove(id: string): Promise<boolean>;
}
