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
import { ICouponController, ICouponService } from 'src/coupon/app/module';
import { Coupon } from 'src/coupon/domain';
import { CouponFactory } from '../coupon.factory';
import { CouponAccountDto, UpdateCouponDTO } from '../dto';
import { DocCouponOutputDto } from '../dto/doc.output.dto';
import { UpdateMatchDTO } from 'src/match/adapter/dto';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';

@ApiTags('Coupon management')
@ApiBearerAuth()
@UseGuards(UserGuard, AdminGuard)
@Controller('coupons')
export class CouponController implements ICouponController {
  constructor(private readonly couponService: ICouponService) {}

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Coupons list',
    description: 'Fetch all Coupons in the DB',
  })
  // @ApiResponse({ type: [CouponAccountDTO] })
  async all(): Promise<Coupon[]> {
    const coupons = await this.couponService.fetchAll();
    return coupons?.map((coupon) => CouponFactory.getCoupon(coupon));
  }


  @Get("pending-coupons")
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Pending coupons list',
    description: 'Fetch all pending Coupons in the DB',
  })
  // @ApiResponse({ type: [CouponAccountDTO] })
  async getPendingCoupons(): Promise<Coupon[]> {
    const coupons = await this.couponService.getPendingCoupons();
    return coupons?.map((coupon) => CouponFactory.getCoupon(coupon));
  }


  @Get('search')
  async search(@Query() param: Coupon): Promise<Coupon> {
    if (param) {
      return CouponFactory.getCoupon(await this.couponService.search(param));
    }
  }

  @Get(':id')
  // @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One Coupon',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed account',
  })
  @ApiResponse({ type: DocCouponOutputDto })
  async show(@Param() { id }: IDParamDTO): Promise<Coupon> {
    return CouponFactory.getCoupon(await this.couponService.fetchOne(id));
  }

  /**
   *
   * @method POST
   */
  @Post()
  @ApiOperation({
    summary: 'Create Coupon',
  })
  // @ApiBody({ type: RegisterAccoutDTO })
  // @ApiResponse({ type: DocUserOutputDTO })
  async create(
    @Body() data: CouponAccountDto
  ): Promise<Coupon> {
    const coupon = await this.couponService.add(data);
    if (coupon) return CouponFactory.getCoupon(coupon);
  }

  /**
   * @method PATCH
   */

  @Patch()
  @ApiBody({ type: UpdateCouponDTO })
  @ApiResponse({ type: DocCouponOutputDto })
  async update(
    @Body() data: UpdateCouponDTO
  ): Promise<Coupon> {
    return CouponFactory.getCoupon(await this.couponService.edit(data));
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiParam({ type: String, name: 'id', description: 'ID of the coupon' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.couponService.setState(id);
  }

  /**
   * @method DELETE
   */
  @Delete(':id')
  // @HasPermission(AccessEnum.CAN_DELETE_USER)
  @ApiOperation({ summary: 'Remove coupon' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the user to delete',
  })
  @ApiResponse({ type: Boolean })
  remove(@Body() { id }: IDParamDTO): Promise<boolean> {
    return this.couponService.remove(id);
  }
  
  @Post('status')
  @ApiOperation({
    summary: 'Create Coupon',
  })
  async checkCoupons(
    @Body() data: UpdateMatchDTO
  ): Promise<any> {
    return await this.couponService.checkCoupons(data);
  }
}
