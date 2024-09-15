import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { UserEntity } from './schema/user.entity';
import { IUserRepository } from '../../domain/data.abstract';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IUserRepository],
})
export class UserRepositoryModule {}
