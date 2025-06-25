import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './schema/user.entity';
import { DBGenericRepository } from 'framework/database.repository';
import { IUserRepository } from '../../domain/data.abstract';
export declare class UserRepository implements IUserRepository, OnApplicationBootstrap {
    private userRepository;
    users: DBGenericRepository<UserEntity>;
    constructor(userRepository: Repository<UserEntity>);
    onApplicationBootstrap(): void;
}
