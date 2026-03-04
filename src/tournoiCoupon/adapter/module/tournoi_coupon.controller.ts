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
import { IDParamDTO } from 'src/_shared/adapter/dto';
import { TournoiCouponFactory } from '../tournoi_coupon.factory';
import { TournoiCouponAccountDto, UpdateTournoiCouponDTO } from '../dto';
import { DocTournoiCouponOutputDto } from '../dto/doc.output.dto';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';
import { ITournoiCouponController, ITournoiCouponService } from 'src/tournoiCoupon/app/module';
import { TournoiCoupon } from 'src/tournoiCoupon/domain';

@ApiTags('Tournoi Coupon management')
@ApiBearerAuth()
@UseGuards(UserGuard, AdminGuard)
@Controller('tournoi-coupons')
export class TournoiCouponController implements ITournoiCouponController {
  constructor(private readonly tournoiCouponService: ITournoiCouponService) { }

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Tournoi Coupons list',
    description: 'Fetch all Tournoi Coupons in the DB',
  })
  // @ApiResponse({ type: [CouponAccountDTO] })
  async all(): Promise<TournoiCoupon[]> {
    const coupons = await this.tournoiCouponService.fetchAll();
    return coupons?.map((coupon) => TournoiCouponFactory.getCoupon(coupon));
  }


  @Get('search')
  async search(@Query() param: TournoiCoupon): Promise<TournoiCoupon> {
    if (param) {
      return TournoiCouponFactory.getCoupon(await this.tournoiCouponService.search(param));
    }
  }

  @Get(':id')
  // @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One Tournoi Coupon',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed account',
  })
  @ApiResponse({ type: DocTournoiCouponOutputDto })
  async show(@Param() { id }: IDParamDTO): Promise<TournoiCoupon> {
    return TournoiCouponFactory.getCoupon(await this.tournoiCouponService.fetchOne(id));
  }

  /**
   *
   * @method POST
   */
  @Post()
  @ApiOperation({
    summary: 'Create Tournoi Coupon',
  })
  // @ApiBody({ type: RegisterAccoutDTO })
  // @ApiResponse({ type: DocUserOutputDTO })
  async create(
    @Body() data: TournoiCouponAccountDto
  ): Promise<TournoiCoupon> {
    const coupon = await this.tournoiCouponService.add(data);
    if (coupon) return TournoiCouponFactory.getCoupon(coupon);
  }

  /**
   * @method PATCH
   */

  @Patch()
  @ApiBody({ type: UpdateTournoiCouponDTO })
  @ApiResponse({ type: DocTournoiCouponOutputDto })
  async update(
    @Body() data: UpdateTournoiCouponDTO
  ): Promise<TournoiCoupon> {
    return TournoiCouponFactory.getCoupon(await this.tournoiCouponService.edit(data));
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiParam({ type: String, name: 'id', description: 'ID of the coupon' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.tournoiCouponService.setState(id);
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
  remove(@Param() { id }: IDParamDTO): Promise<boolean> {
    return this.tournoiCouponService.remove(id);
  }

  @Post('check-tournoi-coupons')
  @ApiOperation({
    summary: 'Check Tournoi Coupons',
  })
  async checkCoupons(): Promise<any> {
    return await this.tournoiCouponService.checkCoupons();
  }
}
