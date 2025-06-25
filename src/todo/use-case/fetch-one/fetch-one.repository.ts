import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DBGenericRepository } from 'framework/database.repository';
import { Todo, TodoEntity } from 'todo/_shared';
import { IFindOneGeneric } from 'domain/abstract';

export abstract class ITodoFindOneRepository {
  abstract todos: IFindOneGeneric<Todo>;
}

@Injectable()
export class TodoFindOneRepository
  implements ITodoFindOneRepository, OnApplicationBootstrap
{
  todos: DBGenericRepository<TodoEntity>;

  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  onApplicationBootstrap(): void {
    this.todos = new DBGenericRepository<TodoEntity>(this.todoRepository);
  }
}
