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
import { IDParamDTO } from 'src/_shared/adapter/dto/param.dto';
import { TournoiCouponBetFactory } from '../tournoi_coupon_bet.factory';
import { TournoiCouponBetAccountDto, UpdateTournoiCouponBetDTO } from '../dto';
import { DocTournoiCouponBetOutputDto } from '../dto/doc.output_bet.dto';
import { TournoiCouponBet } from 'src/tournoiCouponBet/domain';
import { ITournoiCouponBetController, ITournoiCouponBetService } from 'src/tournoiCouponBet/app/module';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';

@ApiTags('Coupon management')
@ApiBearerAuth()
@UseGuards(UserGuard, AdminGuard)
@Controller('tournoi-coupon-bets')
export class TournoiCouponBetController implements ITournoiCouponBetController {
  constructor(private readonly couponBetService: ITournoiCouponBetService) { }

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Coupons list',
    description: 'Fetch all Coupons in the DB',
  })
  // @ApiResponse({ type: [CouponAccountDTO] })
  async all(): Promise<TournoiCouponBet[]> {
    const coupons = await this.couponBetService.fetchAll();
    return coupons?.map((coupon) => TournoiCouponBetFactory.getCouponBet(coupon));
  }


  @Get('search')
  async search(@Query() param: TournoiCouponBet): Promise<TournoiCouponBet> {
    if (param) {
      return TournoiCouponBetFactory.getCouponBet(await this.couponBetService.search(param));
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
  @ApiResponse({ type: DocTournoiCouponBetOutputDto })
  async show(@Param() { id }: IDParamDTO): Promise<TournoiCouponBet> {
    return TournoiCouponBetFactory.getCouponBet(await this.couponBetService.fetchOne(id));
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
    @Body() data: TournoiCouponBetAccountDto
  ): Promise<TournoiCouponBet> {
    const coupon = await this.couponBetService.add(data);
    if (coupon) return TournoiCouponBetFactory.getCouponBet(coupon);
  }

  /**
   * @method PATCH
   */

  @Patch()
  @ApiBody({ type: UpdateTournoiCouponBetDTO })
  @ApiResponse({ type: DocTournoiCouponBetOutputDto })
  async update(
    @Body() data: UpdateTournoiCouponBetDTO
  ): Promise<TournoiCouponBet> {
    return TournoiCouponBetFactory.getCouponBet(await this.couponBetService.edit(data));
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiParam({ type: String, name: 'id', description: 'ID of the coupon' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.couponBetService.setState(id);
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
    return this.couponBetService.remove(id);
  }
}
