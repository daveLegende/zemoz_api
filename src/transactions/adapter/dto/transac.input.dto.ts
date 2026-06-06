import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../../domain';

export class TransactionAccountDto {
  @ApiProperty({
    type: Number,
    name: 'amount',
    description: 'montant du ticket',
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: Number,
    name: 'frais',
    description: 'Frais de pourcentage',
  })
  @IsNumber()
  @IsOptional()
  frais: number;

  @ApiProperty({ description: 'DEPOT ou RETRAIT', enum: TransactionType })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({ description: 'phone du user', type: String })
  @IsString()
  phone: string;

  @ApiProperty({ description: "Id de l'admin", type: String })
  @IsUUID()
  @IsOptional()
  @IsString()
  admin?: string;

  @ApiProperty({ description: "Id de l'user", type: String })
  @IsUUID()
  @IsOptional()
  @IsString()
  user?: string;

  @ApiProperty({ description: "mot de passe de l'admin", type: String })
  @IsString()
  pass: string;
}

export class UpdateTransactionDTO extends PartialType(TransactionAccountDto) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID de la transaction',
  })
  @IsString()
  @IsUUID()
  id: string;
}

export class PassAccountDto {
  @ApiProperty({
    type: String,
    name: 'pass',
    description: 'mot d passe',
    required: true,
  })
  @IsString()
  pass: string;
}

export class UpdatePassDTO extends PartialType(PassAccountDto) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID de la transaction',
  })
  @IsString()
  @IsUUID()
  id: string;
}
