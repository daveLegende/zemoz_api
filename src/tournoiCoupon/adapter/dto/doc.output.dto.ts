import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from "class-validator";
import { TournoiCouponState } from "../../domain";

export class DocTournoiCouponOutputDto {
    @ApiProperty({
        type: String,
        name: 'id',
        description: 'ID',
    })
    @IsString()
    @IsUUID()
    id: string;


    @ApiProperty({
        type: String,
        name: 'user id',
    })
    @IsString()
    user: string;

    @ApiProperty({
        type: Array,
        name: 'Coupons id',
    })
    @IsArray()
    tournoiCoupons: string[];

    @ApiProperty({ description: 'les cotes avec les options', type: Number })
    totalOdds: number;

    @ApiProperty({
        type: Number,
        name: 'amount',
    })
    @IsNumber()
    amount: number;

    @ApiProperty({
        type: Number,
        name: 'gains',
    })
    @IsNumber()
    gains: number;

    @ApiProperty({
        enum: TournoiCouponState,
        name: 'etat',
        description: 'PERDU ou GAGNER ou PENDING',
    })
    @IsEnum(TournoiCouponState)
    etat: TournoiCouponState;

    @ApiProperty({
        type: Boolean,
        name: 'isPaid',
    })
    @IsBoolean()
    isPaid: boolean;
}