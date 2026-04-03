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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { IDParamDTO } from '../../../_shared/adapter/dto';
import { UserGuard } from '../../../user/adapter/guard/auth.guard';
import { AdminGuard } from '../../../admin/adapter/guard/auth.guard';
import { ITransactionController, ITransactionService } from '../../app/module';
import { DocTransactionOutputDto, PassAccountDto, TransactionAccountDto, UpdateTransactionDTO } from '../dto';
import { TransactionFactory } from '../transac.factory';
import { Transaction } from '../../domain';

@ApiTags('Transactions management')
@Controller('transactions')
export class TransactionController implements ITransactionController {
  constructor(private readonly transactionService: ITransactionService) { }

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Transactions list',
    description: 'Fetch all Transactions in the DB',
  })
  // @ApiResponse({ type: [TransactionAccountDTO] })
  async all(): Promise<Transaction[]> {
    const transactions = await this.transactionService.fetchAll();
    return transactions?.map((transaction) => TransactionFactory.getTransaction(transaction));
  }


  @Get('search')
  async search(@Query() param: Transaction): Promise<Transaction> {
    if (param) {
      return TransactionFactory.getTransaction(await this.transactionService.search(param));
    }
  }

  @Get(':id')
  // @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One Transaction',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed account',
  })
  @ApiResponse({ type: DocTransactionOutputDto })
  async show(@Param() { id }: IDParamDTO): Promise<Transaction> {
    return TransactionFactory.getTransaction(await this.transactionService.fetchOne(id));
  }

  /**
   *
   * @method POST
   */
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Post()
  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Create Transaction',
  })
  // @ApiBody({ type: RegisterAccoutDTO })
  // @ApiResponse({ type: DocUserOutputDTO })
  async create(
    @Body() data: TransactionAccountDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionService.add(data);
    if (transaction) return TransactionFactory.getTransaction(transaction);
  }

  /**
   * @method PATCH
   */
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Patch()
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Update user account' })
  @ApiBody({ type: UpdateTransactionDTO })
  @ApiResponse({ type: DocTransactionOutputDto })
  async update(
    @Body() data: UpdateTransactionDTO,
  ): Promise<Transaction> {
    return TransactionFactory.getTransaction(await this.transactionService.edit(data));
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiOperation({ summary: 'Set user account state' })
  @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.transactionService.setState(id);
  }

  /**
   * @method DELETE
   */
  @ApiBearerAuth()
  @UseGuards(UserGuard, AdminGuard)
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
    return this.transactionService.remove(id);
  }

  /**
   *
   * @method POST
   */
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Post("user-transaction")
  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Create Transaction by user',
  })
  async userTransac(
    @Body() data: TransactionAccountDto,
  ): Promise<Transaction> {
    // const transaction = await this.transactionService.add(data);
    // if (transaction) return TransactionFactory.getTransaction(transaction);
    return;
  }
}
