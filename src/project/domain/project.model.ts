import { ITimestamp } from 'domain/interface';
import { AppEnum } from './project.enum';

export class ProjectApp extends ITimestamp {
  id: string;
  name: string;
  description?: string;
  apiKey: string;
  app: AppEnum;
  apiUrl: string;
  frontUrl: string;
  isActivated: boolean;
}
