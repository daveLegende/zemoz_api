import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { IDParamDTO } from '../../../_shared/adapter/dto/param.dto';
import { AdminGuard } from '../../../admin/adapter/guard/auth.guard';
import { IParisController, IParisService } from '../../../paris/app/module';
import { Paris } from '../../../paris/domain';
import { ParisAccountDto, UpdateParisDTO } from '../dto';
import { ParisFactory } from '../paris.factory';
import { DocParisOutputDto } from '../dto/doc.output.dto';

@ApiTags('Bet management')
@UseGuards(AdminGuard)
@ApiBearerAuth()
@Controller('paris')
export class ParisController implements IParisController {
  constructor(private readonly parisService: IParisService) {}

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Bets list',
    description: 'Fetch all Bets in the DB',
  })
  // @ApiResponse({ type: [BetAccountDTO] })
  async all(): Promise<Paris[]> {
    const bets = await this.parisService.fetchAll();
    return bets?.map((bet) => ParisFactory.getParis(bet));
  }

  @Get('search')
  async search(@Query() param: Paris): Promise<Paris> {
    if (param) {
      return ParisFactory.getParis(await this.parisService.search(param));
    }
  }

  @Get(':id')
  // @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One Bet',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed account',
  })
  @ApiResponse({ type: DocParisOutputDto })
  async show(@Param() { id }: IDParamDTO): Promise<Paris> {
    return ParisFactory.getParis(await this.parisService.fetchOne(id));
  }

  /**
   *
   * @method POST
   */
  @Post()
  @ApiOperation({
    summary: 'Create Bet',
  })
  // @ApiBody({ type: RegisterAccoutDTO })
  // @ApiResponse({ type: DocUserOutputDTO })
  async create(@Body() data: ParisAccountDto): Promise<Paris> {
    const bet = await this.parisService.add(data);
    if (bet) return ParisFactory.getParis(bet);
  }

  /**
   * @method PATCH
   */

  @Patch()
  @ApiBody({ type: UpdateParisDTO })
  @ApiResponse({ type: DocParisOutputDto })
  async update(@Body() data: UpdateParisDTO): Promise<Paris> {
    return ParisFactory.getParis(await this.parisService.edit(data));
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiParam({ type: String, name: 'id', description: 'ID of the bet' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.parisService.setState(id);
  }

  /**
   * @method DELETE
   */
  @Delete(':id')
  // @HasPermission(AccessEnum.CAN_DELETE_USER)
  @ApiOperation({ summary: 'Remove bet' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the user to delete',
  })
  @ApiResponse({ type: Boolean })
  remove(@Param() { id }: IDParamDTO): Promise<boolean> {
    return this.parisService.remove(id);
  }
}
