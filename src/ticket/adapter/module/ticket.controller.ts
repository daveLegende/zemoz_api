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
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiOperation,
    ApiBody,
    ApiResponse,
    ApiParam,
    ApiConsumes,
  } from '@nestjs/swagger';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { IDParamDTO } from 'adapter/dto';
  import { BaseConfig } from 'config/base.config';
import { RegisterAccoutDTO, DocUserOutputDTO } from 'user/adapter/dto';
import { TicketFactory } from '../ticket.factory';
import { ITicketController, ITicketService } from 'src/Ticket/app/module';
import { Ticket } from 'src/ticket/domain';
import { TicketAccoutDTO, UpdateTicketDTO } from '../dto';
import { DocTicketOutputDTO } from '../dto/doc.ticket.dto';
  
  @ApiTags('tickets management')
  @Controller('tickets')
  export class TicketController implements ITicketController {
    constructor(private readonly ticketService: ITicketService) {}
  
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
  }
  