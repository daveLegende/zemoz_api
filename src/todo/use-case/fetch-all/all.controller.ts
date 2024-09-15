import { Controller, Get, UseGuards } from '@nestjs/common';
import { IFetchAllTodoService } from './all.interface.service';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { Todo } from 'todo/_shared';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { DocTodoOutputDTO, TodoFactory } from 'todo/_shared';

@ApiTags('Tasks management')
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('tasks')
export class FetchAllTodoController {
  constructor(private readonly allTodoService: IFetchAllTodoService) {}

  @Get()
  @ApiOperation({
    summary: 'Todos list',
    description: 'Fetch all todo list',
  })
  @ApiResponse({ type: [DocTodoOutputDTO] })
  async all(): Promise<Todo[]> {
    const tasks = await this.allTodoService.fetchAll();
    return tasks?.map((task) => TodoFactory.getTodo(task));
  }
}
