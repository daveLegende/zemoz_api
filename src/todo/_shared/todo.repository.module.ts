import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from 'todo/_shared';
import {
  ITodoCreateRepository,
  TodoCreateRepository,
} from 'todo/use-case/add/create.repository';
import {
  ITodoFindOneRepository,
  TodoFindOneRepository,
} from 'todo/use-case/fetch-one/fetch-one.repository';
import {
  ITodoRemoveRepository,
  TodoRemoveRepository,
} from 'todo/use-case/remove/remove.repository';
import {
  ITodoUpdateRepository,
  TodoUpdateRepository,
} from 'todo/use-case/edit/update.repository';
import {
  ITodoFindRepository,
  TodoFindRepository,
} from 'todo/use-case/fetch-all/find.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [
    {
      provide: ITodoCreateRepository,
      useClass: TodoCreateRepository,
    },
    {
      provide: ITodoUpdateRepository,
      useClass: TodoUpdateRepository,
    },
    {
      provide: ITodoRemoveRepository,
      useClass: TodoRemoveRepository,
    },
    {
      provide: ITodoFindRepository,
      useClass: TodoFindRepository,
    },
    {
      provide: ITodoFindOneRepository,
      useClass: TodoFindOneRepository,
    },
  ],
  exports: [
    ITodoCreateRepository,
    ITodoUpdateRepository,
    ITodoRemoveRepository,
    ITodoFindRepository,
    ITodoFindOneRepository,
  ],
})
export class TodoRepositoryModule {}
