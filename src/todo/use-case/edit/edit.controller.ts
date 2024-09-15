import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { IUpdateTodoService } from './edit.interface';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { Todo } from 'todo/_shared';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { UpdateTodoDTO } from './edit.input.dto';
import { DocTodoOutputDTO, TodoFactory } from 'todo/_shared';

@ApiTags('Tasks management')
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('tasks')
export class UpdateTodoController {
  constructor(private readonly updateTodoService: IUpdateTodoService) {}

  @Patch()
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Update todo' })
  @ApiBody({ type: UpdateTodoDTO })
  @ApiResponse({ type: DocTodoOutputDTO })
  async update(@Body() data: UpdateTodoDTO): Promise<Todo> {
    return TodoFactory.getTodo(await this.updateTodoService.edit(data));
  }
}
