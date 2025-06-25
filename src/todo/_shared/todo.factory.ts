import { Todo } from './todo.model';

export abstract class TodoFactory {
  static getTodo(user: Todo): Todo {
    if (user) {
      return {
        id: user.id,
        label: user.label,
        description: user.description,
        dueDate: user.dueDate,
        isClosed: user.isClosed,
        isActivated: user.isActivated,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }
  }
}
