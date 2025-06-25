import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { Todo } from 'todo/_shared';
import { DocTodoOutputDTO, TodoFactory } from 'todo/_shared';
import { ISearchTodoService } from './search.interface';

@ApiTags('Tasks management')
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('tasks')
export class ShowTodoController {
  constructor(private readonly showTodoService: ISearchTodoService) {}

  @Get('search')
  @ApiOperation({
    summary: 'Show task',
    description: 'Fetch task by ID',
  })
  @ApiResponse({ type: DocTodoOutputDTO })
  async show(@Query() param: unknown): Promise<Todo> {
    return TodoFactory.getTodo(await this.showTodoService.search(param));
  }
}
