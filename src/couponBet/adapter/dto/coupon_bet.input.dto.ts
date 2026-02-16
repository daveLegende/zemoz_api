import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsString, IsUUID, ValidateNested } from "class-validator";
import { OddsDto } from "src/bet/adapter/dto";
import { BetStatus } from "src/couponBet/domain";

export class CouponBetAccountDto {
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
        name: 'coupon',
        description: 'ID du coupon',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @IsString()
    coupon: string;

    @ApiProperty({
        description: 'Options sélectionnées avec leur cote',
        example: { V1: 1.85, X: 3.2 }, // ou { HOME: 1.85, AWAY: 2.1 }
    })
    @ValidateNested()
    @Type(() => Object) // ou OddsDto si tu as un DTO global pour toutes les options
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