import { ITimestamp } from '../../_shared/domain/interface';

export class ForgotPass extends ITimestamp {
  id: string;
  code: string;
  email: string;
}
