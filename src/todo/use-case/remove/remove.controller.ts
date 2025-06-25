import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { IDParamDTO } from 'adapter/dto';
import { IRemoveTodoService } from './remove.interface';

@ApiTags('Tasks management')
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('tasks')
export class RemoveTodoController {
  constructor(private readonly removeTodoService: IRemoveTodoService) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Remove todo task' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the task to delete',
  })
  @ApiResponse({ type: Boolean })
  remove(@Param() { id }: IDParamDTO): Promise<boolean> {
    return this.removeTodoService.remove(id);
  }
}
