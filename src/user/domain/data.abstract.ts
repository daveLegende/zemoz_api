// import {
//   ICreateGeneric,
//   IFindGeneric,
//   IFindOneGeneric,
//   IRemoveGeneric,
//   IUpdateGeneric,
// } from 'domain/abstract';
import { User } from './user.model';

import { IGenericRepository } from "src/igeneric.interface";

// interface IGenericRepository<T>
//   extends IFindGeneric<T>,
//     IFindOneGeneric<T>,
//     ICreateGeneric<T>,
//     IUpdateGeneric<T>,
//     IRemoveGeneric<T> {}
// abstract factory
export abstract class IUserRepository {
  abstract users: IGenericRepository<User>;
}
