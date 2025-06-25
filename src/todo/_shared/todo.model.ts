import { ITimestamp } from 'domain/interface';

export class Todo extends ITimestamp {
  id: string;
  label: string;
  description?: string;
  dueDate: Date;
  isClosed: boolean;
  isActivated: boolean;
}
