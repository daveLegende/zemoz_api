import { Todo } from 'todo/_shared';

export abstract class IFetchAllTodoService {
  abstract fetchAll(): Promise<Todo[]>;
}
