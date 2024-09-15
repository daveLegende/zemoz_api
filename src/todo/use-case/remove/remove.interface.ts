export abstract class IRemoveTodoService {
  abstract remove(id: string): Promise<boolean>;
}
