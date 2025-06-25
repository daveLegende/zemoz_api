import { Repository } from 'typeorm';
import { ICreateGeneric, IFindGeneric, IFindOneGeneric, IRemoveGeneric, IUpdateGeneric } from 'domain/abstract';
export declare class DBGenericRepository<T> implements IFindGeneric<T>, IFindOneGeneric<T>, ICreateGeneric<T>, IUpdateGeneric<T>, IRemoveGeneric<T> {
    private _repository;
    constructor(repository: Repository<T>);
    find(options?: any): Promise<T[]>;
    findBy(options: any): Promise<T[]>;
    findOneByID(id: string, options?: any): Promise<T>;
    findByIds(ids: string[], options: any): Promise<T[]>;
    findOne(options: any): Promise<T>;
    findForLogin(options: any): Promise<T>;
    findOneBy(options: any): Promise<T>;
    create(item: T): Promise<T>;
    createMany(items: T[]): Promise<T[]>;
    updateMany(items: T[]): Promise<T[]>;
    update(item: T): Promise<T>;
    clean(items: any): Promise<any>;
    removeMany(items: T[]): Promise<T[]>;
    remove(item: T): Promise<T>;
}
