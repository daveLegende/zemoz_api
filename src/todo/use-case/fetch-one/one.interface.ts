import { Todo } from 'todo/_shared';

export abstract class IShowTodoService {
  abstract fetchOne(id: string): Promise<Todo>;
}
