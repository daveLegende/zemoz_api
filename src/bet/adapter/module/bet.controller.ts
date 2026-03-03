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
import { IDParamDTO } from 'adapter/dto';
import { IBetController, IBetService } from 'src/bet/app/module';
import { Bet } from 'src/bet/domain';
import { BetFactory } from '../bet.factory';
import { BetAccountDto, UpdateBetDTO } from '../dto';
import { DocBetOutputDto } from '../dto/doc.output.dto';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';

@ApiTags('Bet management')
@UseGuards(AdminGuard)
@ApiBearerAuth()
@Controller('bets')
export class BetController implements IBetController {
  constructor(private readonly betService: IBetService) { }

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Bets list',
    description: 'Fetch all Bets in the DB',
  })
  // @ApiResponse({ type: [BetAccountDTO] })
  async all(): Promise<Bet[]> {
    const bets = await this.betService.fetchAll();
    return bets?.map((bet) => BetFactory.getBet(bet));
  }


  @Get('search')
  async search(@Query() param: Bet): Promise<Bet> {
    if (param) {
      return BetFactory.getBet(await this.betService.search(param));
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
  @ApiResponse({ type: DocBetOutputDto })
  async show(@Param() { id }: IDParamDTO): Promise<Bet> {
    return BetFactory.getBet(await this.betService.fetchOne(id));
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
  async create(
    @Body() data: BetAccountDto
  ): Promise<Bet> {
    const bet = await this.betService.add(data);
    if (bet) return BetFactory.getBet(bet);
  }

  /**
   * @method PATCH
   */

  @Patch()
  @ApiBody({ type: UpdateBetDTO })
  @ApiResponse({ type: DocBetOutputDto })
  async update(
    @Body() data: UpdateBetDTO
  ): Promise<Bet> {
    return BetFactory.getBet(await this.betService.edit(data));
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiParam({ type: String, name: 'id', description: 'ID of the bet' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.betService.setState(id);
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
    return this.betService.remove(id);
  }
}
