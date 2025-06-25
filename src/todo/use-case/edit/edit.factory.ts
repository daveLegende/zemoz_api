import { Todo } from 'todo/_shared';
import { IUpdateTodoDTO } from './edit.interface';

export default function updateFactory(todo: Todo, data: IUpdateTodoDTO): Todo {
  todo.label = data.label ?? todo.label;
  todo.description = data.description ?? todo.description;
  todo.dueDate = data.dueDate ?? todo.dueDate;

  return todo;
}
