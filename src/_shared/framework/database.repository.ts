/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { In, Repository } from 'typeorm';
import {
  ICreateGeneric,
  IFindGeneric,
  IFindOneGeneric,
  IRemoveGeneric,
  IUpdateGeneric,
} from '../domain/abstract';

export class DBGenericRepository<T>
  implements
  IFindGeneric<T>,
  IFindOneGeneric<T>,
  ICreateGeneric<T>,
  IUpdateGeneric<T>,
  IRemoveGeneric<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  find(options?: any): Promise<T[]> {
    return this._repository.find(options);
  }

  findAndCount(options?: any): Promise<[T[], number]> {
    return this._repository.findAndCount(options);
  }

  findBy(options: any): Promise<T[]> {
    return this._repository.find({ ...options });
  }

  async findOneByID(id: string, options?: any): Promise<T> {
    options = { ...options, id };
    return await this._repository.findOne({ where: { ...options } });
  }

  async findByIds(ids: string[], options: any): Promise<T[]> {
    const customQuery: any = { id: In(ids), ...options };
    if (ids?.length > 0) {
      return await this._repository.findBy({ ...customQuery });
    }
    return [];
  }

  findOne(options: any): Promise<T> {
    return this._repository.findOne({ ...options });
  }

  findForLogin(options: any): Promise<T> {
    return this._repository.findOne({
      ...options,
      select: { ...options?.select, password: true },
    });
  }

  findOneBy(options: any): Promise<T> {
    return this._repository.findOneBy(options);
  }

  create(item: T): Promise<T> {
    return this._repository.save(item);
  }

  createMany(items: T[]): Promise<T[]> {
    return this._repository.save(items);
  }

  updateMany(items: T[]) {
    return this._repository.save(items);
  }

  update(item: T) {
    return this._repository.save(item);
  }

  clean(items: any): Promise<any> {
    // This method remove permanently
    return this._repository.remove(items);
  }

  removeMany(items: T[]): Promise<T[]> {
    return this._repository.softRemove(items);
  }

  remove(item: T): Promise<T> {
    return this._repository.softRemove(item);
  }
}
