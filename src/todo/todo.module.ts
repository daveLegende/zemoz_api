import { Module } from '@nestjs/common';

import { UserModule } from '../user/adapter/module/user';
import { ProjectApiModule } from 'project/framework/API';
import {
  FetchAllTodoController,
  IFetchAllTodoService,
  FetchAllTodoService,
} from './use-case/fetch-all';
import {
  RemoveTodoController,
  IRemoveTodoService,
  RemoveTodoService,
} from './use-case/remove';
import {
  SetTodoStateController,
  ISetTodoStateService,
  SetTodoStateService,
} from './use-case/set-state';
import {
  ShowTodoController,
  IShowTodoService,
  ShowTodoService,
} from './use-case/fetch-one';
import {
  AddTodoController,
  AddTodoService,
  IAddTodoService,
} from './use-case/add';
import {
  UpdateTodoController,
  IUpdateTodoService,
  UpdateTodoService,
} from './use-case/edit';
import { ISearchTodoService, SearchTodoService } from './use-case/search';
import { TodoRepositoryModule } from './_shared';

@Module({
  imports: [TodoRepositoryModule, ProjectApiModule, UserModule],
  controllers: [
    AddTodoController,
    FetchAllTodoController,
    ShowTodoController,
    UpdateTodoController,
    RemoveTodoController,
    SetTodoStateController,
  ],
  providers: [
    { provide: IAddTodoService, useClass: AddTodoService },
    { provide: IFetchAllTodoService, useClass: FetchAllTodoService },
    { provide: IUpdateTodoService, useClass: UpdateTodoService },
    { provide: IShowTodoService, useClass: ShowTodoService },
    { provide: IRemoveTodoService, useClass: RemoveTodoService },
    { provide: ISetTodoStateService, useClass: SetTodoStateService },
    { provide: ISearchTodoService, useClass: SearchTodoService },
  ],
  exports: [
    ISetTodoStateService,
    IShowTodoService,
    IRemoveTodoService,
    IFetchAllTodoService,
    IAddTodoService,
    TodoRepositoryModule,
    IUpdateTodoService,
  ],
})
export class TodoModule {}
