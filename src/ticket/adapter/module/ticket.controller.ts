import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
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
import { IDParamDTO } from 'import { IDParamDTO } from '../../../ _shared / adapter / dto';';
import { RegisterAccoutDTO, DocUserOutputDTO } from 'user/import { IDParamDTO } from '../../../ _shared / adapter / dto';';
import { TicketFactory } from '../ticket.factory';
import { ITicketController, ITicketService } from 'src/ticket/app/module';
import { Ticket } from 'src/ticket/domain';
import { TicketAccoutDTO, UpdateTicketDTO } from '../dto';
import { DocTicketOutputDTO } from '../dto/doc.ticket.dto';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';

@ApiTags('tickets management')
@ApiBearerAuth()
@UseGuards(UserGuard, AdminGuard)
@Controller('tickets')
export class TicketController implements ITicketController {
  constructor(private readonly ticketService: ITicketService) { }

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Tickets list',
    description: 'Fetch all Tickets in the DB',
  })
  // @ApiResponse({ type: [TicketAccountDTO] })
  async all(): Promise<Ticket[]> {
    const Tickets = await this.ticketService.fetchAll();
    return Tickets?.map((Ticket) => TicketFactory.getTicket(Ticket));
  }


  @Get('search')
  async search(@Query() param: Ticket): Promise<Ticket> {
    if (param) {
      return TicketFactory.getTicket(await this.ticketService.search(param));
    }
  }

  @Get(':id')
  // @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One Ticket',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed account',
  })
  @ApiResponse({ type: DocTicketOutputDTO })
  async show(@Param() { id }: IDParamDTO): Promise<Ticket> {
    return TicketFactory.getTicket(await this.ticketService.fetchOne(id));
  }

  /**
   *
   * @method POST
   */

  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Post()
  @ApiOperation({
    summary: 'Create Ticket',
  })
  @ApiBody({ type: RegisterAccoutDTO })
  @ApiResponse({ type: DocUserOutputDTO })
  async create(
    @Body() data: TicketAccoutDTO,
  ): Promise<Ticket> {
    const Ticket = await this.ticketService.add(data);
    if (Ticket) return TicketFactory.getTicket(Ticket);
  }

  /**
   * @method PATCH
   */

  @Patch()
  @ApiOperation({ summary: 'Update user account' })
  @ApiBody({ type: UpdateTicketDTO })
  @ApiResponse({ type: DocTicketOutputDTO })
  async update(
    @Body() data: UpdateTicketDTO,
  ): Promise<Ticket> {
    return TicketFactory.getTicket(await this.ticketService.edit(data));
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiOperation({ summary: 'Set user account state' })
  @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.ticketService.setState(id);
  }

  /**
   * @method DELETE
   */
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Delete(':id')
  // @HasPermission(AccessEnum.CAN_DELETE_USER)
  @ApiOperation({ summary: 'Remove Account' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the user to delete',
  })
  @ApiResponse({ type: Boolean })
  remove(@Param() { id }: IDParamDTO): Promise<boolean> {
    return this.ticketService.remove(id);
  }

  @Post('scan')
  async scanTicket(@Body('qrCode') qrCode: string) {
    return this.ticketService.scanTicket(qrCode);
  }
}
