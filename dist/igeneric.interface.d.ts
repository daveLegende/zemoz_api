import { ICreateGeneric, IFindGeneric, IFindOneGeneric, IRemoveGeneric, IUpdateGeneric } from 'domain/abstract';
interface IGenericRepository<T> extends IFindGeneric<T>, IFindOneGeneric<T>, ICreateGeneric<T>, IUpdateGeneric<T>, IRemoveGeneric<T> {
}
export { IGenericRepository };
