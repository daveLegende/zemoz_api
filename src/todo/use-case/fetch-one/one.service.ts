import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Todo } from 'todo/_shared';
import { IShowTodoService } from './one.interface';
import { ITodoFindOneRepository } from './fetch-one.repository';

@Injectable()
export class ShowTodoService implements IShowTodoService {
  private readonly logger = new Logger();
  constructor(private todoRepository: ITodoFindOneRepository) {}

  async fetchOne(id: string): Promise<Todo> {
    try {
      const user = await this.todoRepository.todos.findOneByID(id);
      if (user) {
        return user;
      }
      throw new NotFoundException('Todo not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TodoService.fetchOne');
      throw error;
    }
  }
}
