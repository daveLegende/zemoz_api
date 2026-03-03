import { HashFactory } from './guard/hash.factory';
import { ICreateUserDTO, IUpdateUserDTO } from '../app/dto/user.input.dto';
import { User } from '../domain/user.model';

export abstract class UserFactory {
  static async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    user.email = data.email;
    user.phone = data.phone;
    user.firstname = data.firstname;
    user.lastname = data.lastname;
    user.solde = data.solde;
    user.sex = data.sex;
    user.country = data.country;
    user.avatar = data.avatar;
    user.password = await HashFactory.hashPwd(data.password);
    return user;
  }

  static update(user: User, data: IUpdateUserDTO): User {
    user.email = data.email ?? user.email;
    // user.phone = data.phone ?? user.phone;
    user.firstname = data.firstname ?? user.firstname;
    user.lastname = data.lastname ?? user.lastname;
    user.solde = data.solde ?? user.solde;
    // user.country = data.country ?? user.country;
    user.avatar = data.avatar;

    return user;
  }

  static getFileLink(file: string): string {
    if (file) {
      return `${process.env.APP_BASE_URL}/files/${file}`;
    }
  }

  static getUser(user: User): User {
    if (user) {
      return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
        solde: user.solde,
        country: user.country,
        sex: user.sex,
        avatar: this.getFileLink(user.avatar),
        isActivated: user.isActivated,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }
  }
}
