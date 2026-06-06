import { ITimestamp } from '../../_shared/domain/interface';

export class Info extends ITimestamp {
  id: string;
  image: string;
  title: string;
  desc: string;
}
