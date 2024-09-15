import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { IDParamDTO } from 'adapter/dto';
import { ISetTodoStateService } from './set-state.interface';

@ApiTags('Tasks management')
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('tasks')
export class SetTodoStateController {
  constructor(private readonly setTotoStateService: ISetTodoStateService) {}

  @Patch('state/:id')
  @ApiOperation({ summary: 'Set todo task state' })
  @ApiParam({ type: String, name: 'id', description: 'ID of the supplier' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.setTotoStateService.setState(id);
  }
}
