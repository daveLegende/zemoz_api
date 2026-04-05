import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsObject, IsString, IsUUID, ValidateNested } from "class-validator";
import { OddsDto } from "../../../bet/adapter/dto";
import { BetStatus } from "../../../couponBet/domain";

export class TournoiCouponBetAccountDto {
    @ApiProperty({
        type: String,
        name: 'bet',
        description: 'ID du pari',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @IsString()
    bet: string;

    @ApiProperty({
        type: String,
        name: 'tournoiCoupon',
        description: 'ID du coupon de tournoi',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @IsString()
    tournoiCoupon: string;

    @ApiProperty({
        description: 'Options sélectionnées avec leur cote',
        example: { V1: 1.85, X: 3.2 },
    })
    @IsObject()
    selectedOptions: Record<string, number>;

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

export class UpdateTournoiCouponBetDTO extends PartialType(TournoiCouponBetAccountDto) {
    @ApiProperty({
        type: String,
        name: 'id',
        description: 'ID',
    })
    @IsString()
    @IsUUID()
    id: string;
}