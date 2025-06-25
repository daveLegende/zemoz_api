import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IAddTodoService } from './add.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { BaseConfig } from 'config/base.config';
import { diskStorage } from 'multer';
import { Todo } from 'todo/_shared';
import { GetAccount } from 'user/adapter/decorator';
import { User } from 'user/domain';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { CreateTodoDTO } from './add.input.dto';
import { DocTodoOutputDTO, TodoFactory } from 'todo/_shared';

@ApiTags('Tasks management')
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('tasks')
export class AddTodoController {
  constructor(private readonly addTodoService: IAddTodoService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: BaseConfig.setFilePath,
        filename: BaseConfig.editFileName,
      }),
      fileFilter: BaseConfig.fileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Create todo task',
  })
  @ApiBody({ type: CreateTodoDTO })
  @ApiResponse({ type: DocTodoOutputDTO })
  async create(
    @GetAccount() user: User,
    @Body() data: CreateTodoDTO,
  ): Promise<Todo> {
    const todo = await this.addTodoService.add(data);
    if (todo) return TodoFactory.getTodo(todo);
  }
}
