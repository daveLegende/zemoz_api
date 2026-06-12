import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Max, Min, ValidateNested } from "class-validator";
import { OddsDto } from "../../../bet/adapter/dto";
import { BetCoupon } from "../../../coupon/app/dto";
import { CouponState } from "../../../coupon/domain";
import { CouponBet } from "../../../couponBet/domain";

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
        name: 'user',
        description: 'ID de l\'utilisateur',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    user: string;

    @ApiProperty({ description: 'Les cotes avec les options', type: BetCoupon })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BetCoupon)
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
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
    @IsPositive()
    @Min(100)
    @Max(100000)
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
    @IsOptional()
    etat: CouponState;

    @ApiProperty({
        type: Boolean,
        name: 'isDeleted',
    })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @ApiProperty({
        type: Boolean,
        name: 'isPaid',
    })
    @IsOptional()
    @IsBoolean()
    isPaid?: boolean;
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