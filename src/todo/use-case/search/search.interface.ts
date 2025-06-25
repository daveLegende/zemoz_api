import { Todo } from 'todo/_shared';

export abstract class ISearchTodoService {
  abstract search(param: Partial<Todo>): Promise<Todo>;
}
