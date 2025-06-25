import { Injectable, Logger } from '@nestjs/common';
import { ISetTodoStateService } from './set-state.interface';
import { IShowTodoService } from '../fetch-one';
import { ITodoUpdateRepository } from '../edit/update.repository';

@Injectable()
export class SetTodoStateService implements ISetTodoStateService {
  logger: any;
 
 

  constructor(
    private todoRepository: ITodoUpdateRepository,
    private showTodoService: IShowTodoService,
  ) {}

  async setState(id: string): Promise<boolean> {
    try {
      const user = id && (await this.showTodoService.fetchOne(id));
      if (user) {
        user.isActivated = !user.isActivated;
        return await this.todoRepository.todos.update(user).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TodoService.setState');
      return false;
    }
  }
}
