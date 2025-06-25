import { ICreateUserDTO, IUpdateUserDTO } from '../app/dto/user.input.dto';
import { User } from '../domain/user.model';
export declare abstract class UserFactory {
    static create(data: ICreateUserDTO): Promise<User>;
    static update(user: User, data: IUpdateUserDTO): User;
    static getFileLink(file: string): string;
    static getUser(user: User): User;
}
