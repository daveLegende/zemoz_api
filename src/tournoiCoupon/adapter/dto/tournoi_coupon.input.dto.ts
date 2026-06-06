import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { OddsDto } from '../../../bet/adapter/dto';
import { BetTournoiCoupon } from '../../app/dto';
import { TournoiCouponState } from '../../domain';

export class TournoiCouponAccountDto {
  @ApiProperty({
    type: String,
    name: 'user',
    description: "ID de l'utilisateur",
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  user: string;

  @ApiProperty({
    description: 'Les cotes avec les options',
    type: BetTournoiCoupon,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BetTournoiCoupon)
  tournoiCouponBets: BetTournoiCoupon[];

  @ApiProperty({
    name: 'totalOdds',
    type: Number,
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
    enum: TournoiCouponState,
    name: 'etat',
    description: 'PERDU ou GAGNER ou PENDING',
  })
  @IsEnum(TournoiCouponState)
  @IsOptional()
  etat: TournoiCouponState;

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

export class UpdateTournoiCouponDTO extends PartialType(
  TournoiCouponAccountDto,
) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID',
  })
  @IsString()
  @IsUUID()
  id: string;
}
