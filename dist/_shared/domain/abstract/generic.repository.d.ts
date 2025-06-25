import { PartialDeep, PartialDeepBool, PartialOrder } from 'domain/types';
export interface RepoParam<T> {
    relations?: PartialDeepBool<T>;
    select?: PartialDeepBool<T>;
    where?: PartialDeep<T> | PartialDeep<T>[];
    withDeleted?: boolean;
    order?: PartialOrder<T>;
    skip?: number;
    take?: number;
}
export declare abstract class IFindGeneric<T> {
    abstract findBy(options: PartialDeep<T>): Promise<T[]>;
    abstract find(options?: RepoParam<T>): Promise<T[]>;
    abstract findByIds(ids: string[], options?: PartialDeep<T>): Promise<T[]>;
}
export declare abstract class IFindOneGeneric<T> {
    abstract findOneByID(id: string, options?: PartialDeep<T>): Promise<T>;
    abstract findOneBy(options: PartialDeep<T>): Promise<T>;
    abstract findForLogin(options: PartialDeep<T>): Promise<T>;
    abstract findOne(options: RepoParam<T>): Promise<T>;
}
export declare abstract class ICreateGeneric<T> {
    abstract create(options: T): Promise<T>;
    abstract createMany(items: T[]): Promise<T[]>;
}
export declare abstract class IUpdateGeneric<T> {
    abstract updateMany(items: T[]): Promise<T[]>;
    abstract update(item: T): Promise<T>;
}
export declare abstract class IRemoveGeneric<T> {
    abstract clean(item: T | T[]): Promise<T | []>;
    abstract removeMany(item: T[]): Promise<T[]>;
    abstract remove(item: T): Promise<T>;
}
