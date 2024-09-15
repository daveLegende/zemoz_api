import { Todo } from 'todo/_shared';
import { ICreateTodoDTO } from '../add';

export interface IUpdateTodoDTO extends Partial<ICreateTodoDTO> {
  id: string;
}

export abstract class IUpdateTodoService {
  abstract edit(data: IUpdateTodoDTO): Promise<Todo>;
}
