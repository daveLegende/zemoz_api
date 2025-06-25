import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsString, IsUUID, ValidateNested } from "class-validator";
import { OddsDto } from "src/bet/adapter/dto";
import { BetStatus } from "src/couponBet/domain";

export class CouponBetAccountDto {
    @ApiProperty({
        type: String,
        name: 'bet id',
    })
    @IsString()
    bet: string;

    @ApiProperty({
        type: String,
        name: 'coupon id',
    })
    @IsString()
    coupon: string;
    
    @ApiProperty({ description: 'Les cotes avec les options', type: OddsDto })
    @ValidateNested()
    @Type(() => OddsDto)
    selectedOptions: OddsDto;

    @ApiProperty({
        enum: BetStatus,
        name: 'etat',
        description: 'PERDU ou GAGNER ou PENDING',
        default: BetStatus.PENDING,
        nullable: true,
    })
    @IsEnum(BetStatus)
    status?: BetStatus;
}

export class UpdateCouponBetDTO extends PartialType(CouponBetAccountDto) {
    @ApiProperty({
      type: String,
      name: 'id',
      description: 'ID',
    })
    @IsString()
    @IsUUID()
    id: string;
  }