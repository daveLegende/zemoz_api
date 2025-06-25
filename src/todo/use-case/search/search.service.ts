import { Injectable, Logger } from '@nestjs/common';
import { Todo } from 'todo/_shared';
import { ISearchTodoService } from './search.interface';
import { ITodoFindOneRepository } from '../fetch-one/fetch-one.repository';

@Injectable()
export class SearchTodoService implements ISearchTodoService {
  private readonly logger = new Logger();
  constructor(private todoRepository: ITodoFindOneRepository) {}

  async search(param: Partial<Todo>): Promise<Todo> {
    try {
      if (param && Object.keys(param).length > 0) {
        return await this.todoRepository.todos.findOneBy({ ...param });
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TodoService.fetchOne');
      throw error;
    }
  }
}
