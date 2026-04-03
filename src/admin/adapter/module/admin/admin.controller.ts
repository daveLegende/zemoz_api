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
import { IDParamDTO } from '../../../../_shared/adapter/dto';
import { IAdminController, IAdminService } from '../../../app/module';
import { Admin } from '../../../domain';
import { AdminFactory } from '../../admin.factory';
import { DocAdminOutputDto, AdminAccountDto, UpdateAdminDTO, ChangeAdminPasswordDTO } from '../../dto';
import { AdminGuard } from '../../guard/auth.guard';
import { Coupon } from '../../../../coupon/domain';
import { TournoiCoupon } from '../../../../tournoiCoupon/domain';

@ApiTags('Admins management')
@UseGuards(AdminGuard)
@ApiBearerAuth()
@Controller('admins')
export class AdminController implements IAdminController {
  constructor(private readonly adminService: IAdminService) { }


  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Admins list',
    description: 'Fetch all Admins in the DB',
  })
  // @ApiResponse({ type: [AdminAccountDTO] })
  async all(): Promise<Admin[]> {
    const admins = await this.adminService.fetchAll();
    return admins?.map((admin) => AdminFactory.getAdmin(admin));
  }


  @Get('search')
  async search(@Query() param: Admin): Promise<Admin> {
    if (param) {
      return AdminFactory.getAdmin(await this.adminService.search(param));
    }
  }

  @Get('report')
  @ApiOperation({
    summary: 'Complete financial report',
    description: 'Fetch complete financial report',
  })
  @ApiResponse({ type: Object })
  async getCompleteFinancialReport(): Promise<any> {
    return await this.adminService.getCompleteFinancialReport();
  }

  @Get(':id')
  // @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One Admin',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed account',
  })
  @ApiResponse({ type: DocAdminOutputDto })
  async show(@Param() { id }: IDParamDTO): Promise<Admin> {
    return AdminFactory.getAdmin(await this.adminService.fetchOne(id));
  }

  /**
   *
   * @method POST
   */

  @Post()
  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Create Admin',
  })
  // @ApiBody({ type: RegisterAccoutDTO })
  // @ApiResponse({ type: DocUserOutputDTO })
  async create(
    @Body() data: AdminAccountDto,
  ): Promise<Admin> {
    const Admin = await this.adminService.add(data);
    if (Admin) return AdminFactory.getAdmin(Admin);
  }

  /**
   * @method PATCH
   */

  @Patch()
  // @HasPermission(AccessEnum.CAN_UPDATE_USER)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Update user account' })
  @ApiBody({ type: UpdateAdminDTO })
  @ApiResponse({ type: DocAdminOutputDto })
  async update(
    @Body() data: UpdateAdminDTO,
  ): Promise<Admin> {
    return AdminFactory.getAdmin(await this.adminService.edit(data));
  }

  @Patch('change-password')
  @ApiOperation({ summary: 'Change admin password' })
  @ApiBody({ type: ChangeAdminPasswordDTO })
  @ApiResponse({ type: Boolean })
  async changePassword(
    @Body() data: ChangeAdminPasswordDTO,
  ): Promise<boolean> {
    return await this.adminService.changePassword(data);
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiOperation({ summary: 'Set user account state' })
  @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.adminService.setState(id);
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
    return this.adminService.remove(id);
  }

  @Get('coupons')
  @ApiOperation({ summary: 'Get all coupons' })
  @ApiResponse({ type: [Coupon] })
  async getAllCoupons(): Promise<Coupon[]> {
    return await this.adminService.getAllCoupons();
  }

  @Get('tournoi-coupons')
  @ApiOperation({ summary: 'Get all tournoi coupons' })
  @ApiResponse({ type: [TournoiCoupon] })
  async getAllTournoiCoupons(): Promise<TournoiCoupon[]> {
    return await this.adminService.getAllTournoiCoupons();
  }

}
