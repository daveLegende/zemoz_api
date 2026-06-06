import { IGenericRepository } from '../../igeneric.interface';
import { Admin } from './admin.model';

export abstract class IAdminRepository {
  abstract admins: IGenericRepository<Admin>;
}
