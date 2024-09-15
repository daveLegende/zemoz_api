import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IShowTodoService } from './one.interface';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { IDParamDTO } from 'adapter/dto';
import { Todo } from 'todo/_shared';
import { DocTodoOutputDTO, TodoFactory } from 'todo/_shared';

@ApiTags('Tasks management')
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('tasks')
export class ShowTodoController {
  constructor(private readonly showTodoService: IShowTodoService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Show task',
    description: 'Fetch task by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed task',
  })
  @ApiResponse({ type: DocTodoOutputDTO })
  async show(@Param() { id }: IDParamDTO): Promise<Todo> {
    return TodoFactory.getTodo(await this.showTodoService.fetchOne(id));
  }
}
