import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DBGenericRepository } from 'framework/database.repository';
import { Todo, TodoEntity } from 'todo/_shared';
import { IUpdateGeneric } from 'domain/abstract';

export abstract class ITodoUpdateRepository {
  abstract todos: IUpdateGeneric<Todo>;
}

@Injectable()
export class TodoUpdateRepository
  implements ITodoUpdateRepository, OnApplicationBootstrap
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
