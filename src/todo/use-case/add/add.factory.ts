import { Todo } from 'todo/_shared';
import { ICreateTodoDTO } from './add.interface';

export default function createFactory(data: ICreateTodoDTO): Todo {
  const todo = new Todo();
  todo.label = data.label;
  todo.description = data.description;
  todo.dueDate = new Date(data.dueDate);
  return todo;
}
