import { Todo } from 'todo/_shared';

export interface ICreateTodoDTO {
  label: string;

  description?: string;

  dueDate: Date;
}

export abstract class IAddTodoService {
  abstract add(data: ICreateTodoDTO): Promise<Todo>;
}
