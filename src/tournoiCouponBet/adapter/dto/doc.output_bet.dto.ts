import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { OddsDto } from "../../../bet/adapter/dto";

export class DocTournoiCouponBetOutputDto {
    @ApiProperty({
        type: String,
        name: 'bet id',
    })
    @IsString()
    bet: string;

    @ApiProperty({
        type: String,
        name: 'tournoi coupon id',
    })
    @IsString()
    tournoiCoupon: string;
    
    @ApiProperty({ description: 'Les cotes avec les options', type: OddsDto })
    @ValidateNested()
    @Type(() => OddsDto)
    selectedOptions: OddsDto;
}