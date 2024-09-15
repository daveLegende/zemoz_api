import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserFactory } from 'user/adapter/user.factory';
import {
  RegisterAccoutDTO,
  UpdateUserDTO,
} from 'user/adapter/dto/user.input.dto';
import { IUserService } from 'user/app/module/user';
import { User } from 'user/domain';
import { IUserRepository } from 'user/domain/data.abstract';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger();
  constructor(private userRepository: IUserRepository) {}

  async fetchAll(): Promise<User[]> {
    try {
      return await this.userRepository.users.find();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.users.findOneByID(id);
      if (user) {
        return user;
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.fetchOne');
      throw error;
    }
  }

  async search(data: Partial<User>): Promise<User> {
    return await this.userRepository.users.findOneBy({ ...data });
  }

  async add(data: RegisterAccoutDTO): Promise<User> {
    try {
      const { email } = data;
      const existed = await this.userRepository.users.findOneBy({ email });
      if (existed)
        throw new ConflictException('User account email allready exist');
      return await this.userRepository.users.create(
        await UserFactory.create(data),
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.add');
      throw error;
    }
  }

  async edit(data: UpdateUserDTO): Promise<User> {
    try {
      const { id } = data;
      const user = id && (await this.userRepository.users.findOneByID(id));
      if (user) {
        return await this.userRepository.users.update(
          UserFactory.update(user, data),
        );
      }
      throw new NotFoundException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.editUser');

      throw error;
    }
  }

  async setState(id: string): Promise<boolean> {
    try {
      const user = id && (await this.userRepository.users.findOneByID(id));
      if (user) {
        user.isActivated = !user.isActivated;
        return await this.userRepository.users.update(user).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.setState');
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const user = await this.userRepository.users.findOneByID(id);
      if (user) {
        return await this.userRepository.users.remove(user).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.remove');
      return false;
    }
  }
}
