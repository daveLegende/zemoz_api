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
import { IDParamDTO, PaginationQueryDTO } from '../../../_shared/adapter/dto';
import { RegisterAccoutDTO, DocUserOutputDTO } from '../../../user/adapter/dto';
import { TicketFactory } from '../ticket.factory';
import { ITicketController, ITicketService } from '../../app/module';
import { Ticket } from '../../domain';
import { TicketAccoutDTO, UpdateTicketDTO } from '../dto';
import { DocTicketOutputDTO } from '../dto/doc.ticket.dto';
import { AccountGuard } from '../../../account/adapter/guard/account.guard';
import { PaginatedResult, mapPaginated } from '../../../_shared/domain/pagination';

@ApiTags('tickets management')
@ApiBearerAuth()
@UseGuards(AccountGuard)
@Controller('tickets')
export class TicketController implements ITicketController {
  constructor(private readonly ticketService: ITicketService) { }

  @Get()
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Tickets list',
    description: 'Fetch all Tickets in the DB',
  })
  async all(@Query() query?: PaginationQueryDTO): Promise<PaginatedResult<Ticket>> {
    const Tickets = await this.ticketService.fetchAll(query);
    return mapPaginated(Tickets, (Ticket) => TicketFactory.getTicket(Ticket));
  }

  @Get('search')
  async search(@Query() param: Ticket): Promise<Ticket> {
    if (param) {
      return TicketFactory.getTicket(await this.ticketService.search(param));
    }
  }

  @Get(':id')
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
  @ApiOperation({ summary: 'Set user account state' })
  @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.ticketService.setState(id);
  }

  @Delete(':id')
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
