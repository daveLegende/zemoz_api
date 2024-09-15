import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { OddsDto } from "src/bet/adapter/dto";
import { OddsClass } from "src/bet/domain";
import { BetCoupon } from "src/coupon/app/dto";
import { CouponState } from "src/coupon/domain";
import { CouponBet } from "src/couponBet/domain";

export class BetCouponDTO {
    @ApiProperty({
        type: String,
        name: 'bet id',
    })
    @IsString()
    bet: string;

    @ApiProperty({ description: 'Les cotes avec les options', type: OddsDto })
    @IsArray()
    couponBets: BetCoupon[];
}

export class CouponAccountDto {
    @ApiProperty({
        type: String,
        name: 'user id',
    })
    @IsString()
    user: string;

    @ApiProperty({ description: 'Les cotes avec les options', type: BetCoupon })
    @IsArray()
    couponBets: CouponBet[];

    @ApiProperty({ 
        name: 'totalOdds', 
        type: Number
    })
    @IsOptional()
    @IsNumber()
    totalOdds?: number;

    @ApiProperty({
        type: Number,
        name: 'amount',
    })
    @IsInt()
    amount: number;

    @ApiProperty({
        type: Number,
        name: 'gains',
    })
    @IsOptional()
    @IsNumber()
    gains?: number;

    @ApiProperty({
        enum: CouponState,
        name: 'etat',
        description: 'PERDU ou GAGNER ou PENDING',
    })
    @IsEnum(CouponState)
    etat: CouponState;
}

export class UpdateCouponDTO extends PartialType(CouponAccountDto) {
    @ApiProperty({
      type: String,
      name: 'id',
      description: 'ID',
    })
    @IsString()
    @IsUUID()
    id: string;
  }