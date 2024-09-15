import { Injectable, Logger } from '@nestjs/common';
import { Todo } from 'todo/_shared';
import { IFetchAllTodoService } from './all.interface.service';
import { ITodoFindRepository } from './find.repository';

@Injectable()
export class FetchAllTodoService implements IFetchAllTodoService {
  private readonly logger = new Logger();
  constructor(private todoRepository: ITodoFindRepository) {}

  async fetchAll(): Promise<Todo[]> {
    try {
      return await this.todoRepository.todos.find();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TodoService.fetchAll');
      throw error;
    }
  }
}
