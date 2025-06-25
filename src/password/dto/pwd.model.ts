import { ITimestamp } from 'domain/interface';

export class Password extends ITimestamp {
  id: string;
  pass: string;
}
