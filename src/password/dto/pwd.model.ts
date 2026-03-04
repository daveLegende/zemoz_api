import { ITimestamp } from '../../_shared/domain/interface';

export class Password extends ITimestamp {
  id: string;
  pass: string;
}
