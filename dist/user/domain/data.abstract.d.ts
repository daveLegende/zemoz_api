import { User } from './user.model';
import { IGenericRepository } from "src/igeneric.interface";
export declare abstract class IUserRepository {
    abstract users: IGenericRepository<User>;
}
