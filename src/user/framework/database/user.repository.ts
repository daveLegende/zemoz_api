import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './schema/user.entity';
import { DBGenericRepository } from '../../../_shared/framework/database.repository';
import { IUserRepository } from '../../domain/data.abstract';

@Injectable()
export class UserRepository implements IUserRepository, OnApplicationBootstrap {
  users: DBGenericRepository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  onApplicationBootstrap(): void {
    this.users = new DBGenericRepository<UserEntity>(this.userRepository);
  }
}
