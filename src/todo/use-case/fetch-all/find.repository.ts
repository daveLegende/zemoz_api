import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DBGenericRepository } from 'framework/database.repository';
import { Todo, TodoEntity } from 'todo/_shared';
import { IFindGeneric } from 'domain/abstract';

export abstract class ITodoFindRepository {
  abstract todos: IFindGeneric<Todo>;
}

@Injectable()
export class TodoFindRepository
  implements ITodoFindRepository, OnApplicationBootstrap
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
