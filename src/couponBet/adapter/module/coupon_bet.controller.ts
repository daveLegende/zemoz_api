import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { IDParamDTO } from 'adapter/dto';
import { CouponBetFactory } from '../coupon_bet.factory';
import { CouponBetAccountDto, UpdateCouponBetDTO } from '../dto';
import { DocCouponBetOutputDto } from '../dto/doc.output_bet.dto';
import { CouponBet } from 'src/couponBet/domain';
import { ICouponBetController, ICouponBetService } from 'src/couponBet/app/module';

@ApiTags('Coupon management')
@Controller('coupons')
export class CouponBetController implements ICouponBetController {
  constructor(private readonly couponBetService: ICouponBetService) {}

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Coupons list',
    description: 'Fetch all Coupons in the DB',
  })
  // @ApiResponse({ type: [CouponAccountDTO] })
  async all(): Promise<CouponBet[]> {
    const coupons = await this.couponBetService.fetchAll();
    return coupons?.map((coupon) => CouponBetFactory.getCouponBet(coupon));
  }


  @Get('search')
  async search(@Query() param: CouponBet): Promise<CouponBet> {
    if (param) {
      return CouponBetFactory.getCouponBet(await this.couponBetService.search(param));
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
  @ApiResponse({ type: DocCouponBetOutputDto })
  async show(@Param() { id }: IDParamDTO): Promise<CouponBet> {
    return CouponBetFactory.getCouponBet(await this.couponBetService.fetchOne(id));
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
    @Body() data: CouponBetAccountDto
  ): Promise<CouponBet> {
    const coupon = await this.couponBetService.add(data);
    if (coupon) return CouponBetFactory.getCouponBet(coupon);
  }

  /**
   * @method PATCH
   */

  @Patch()
  @ApiBody({ type: UpdateCouponBetDTO })
  @ApiResponse({ type: DocCouponBetOutputDto })
  async update(
    @Body() data: UpdateCouponBetDTO
  ): Promise<CouponBet> {
    return CouponBetFactory.getCouponBet(await this.couponBetService.edit(data));
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
