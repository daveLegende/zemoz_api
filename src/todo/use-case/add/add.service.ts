import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { Todo } from 'todo/_shared';
import { IAddTodoService, ICreateTodoDTO } from './add.interface';
import createFactory from './add.factory';
import { ISearchTodoService } from '../search';
import { ITodoCreateRepository } from './create.repository';

@Injectable()
export class AddTodoService implements IAddTodoService {
  private readonly logger = new Logger();
  constructor(
    private todoRepository: ITodoCreateRepository,
    private searchTodoService: ISearchTodoService,
  ) {}

  async add(data: ICreateTodoDTO): Promise<Todo> {
    try {
      const { label } = data;
      const existed = await this.searchTodoService.search({ label });
      if (existed) throw new ConflictException('Todo label allready exist');
      return await this.todoRepository.todos.create(createFactory(data));
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TodoService.add');
      throw error;
    }
  }
}
