import { Injectable, Logger } from '@nestjs/common';
import { IRemoveTodoService } from './remove.interface';
import { IShowTodoService } from '../fetch-one';
import { ITodoRemoveRepository } from './remove.repository';

@Injectable()
export class RemoveTodoService implements IRemoveTodoService {
  private readonly logger = new Logger();
  constructor(
    private todoRepository: ITodoRemoveRepository,
    private showTodoService: IShowTodoService,
  ) {}

  async remove(id: string): Promise<boolean> {
    try {
      const user = await this.showTodoService.fetchOne(id);
      if (user) {
        return await this.todoRepository.todos.remove(user).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TodoService.remove');
      return false;
    }
  }
}
