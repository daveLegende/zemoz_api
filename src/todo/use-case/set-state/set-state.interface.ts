export abstract class ISetTodoStateService {
  abstract setState(id: string): Promise<boolean>;
}
