import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { CouponState } from '../../../coupon/domain';

export class DocCouponOutputDto {
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
  Coupons: string[];

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
    enum: CouponState,
    name: 'etat',
    description: 'PERDU ou GAGNER ou PENDING',
  })
  @IsEnum(CouponState)
  etat: CouponState;

  @ApiProperty({
    type: Boolean,
    name: 'isPaid',
  })
  @IsBoolean()
  isPaid: boolean;
}
