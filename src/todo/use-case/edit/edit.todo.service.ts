import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Todo } from 'todo/_shared';
import { IUpdateTodoDTO, IUpdateTodoService } from './edit.interface';
import updateFactory from './edit.factory';
import { IShowTodoService } from '../fetch-one';
import { ITodoUpdateRepository } from './update.repository';

@Injectable()
export class UpdateTodoService implements IUpdateTodoService {
  private readonly logger = new Logger();
  constructor(
    private updateTodoRepository: ITodoUpdateRepository,
    private showTodoService: IShowTodoService,
  ) {}

  async edit(data: IUpdateTodoDTO): Promise<Todo> {
    try {
      const { id } = data;
      const user = id && (await this.showTodoService.fetchOne(id));
      if (user) {
        return await this.updateTodoRepository.todos.update(
          updateFactory(user, data),
        );
      }
      throw new NotFoundException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TodoService.editTodo');

      throw error;
    }
  }
}
