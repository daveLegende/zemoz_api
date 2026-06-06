import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { RoleArbitre } from '../../domain';

export class ArbitreAccountDto {
  @ApiProperty({
    type: String,
    name: 'nom de la Arbitre',
    description: 'Nom complet: AKAKPO Bertin',
  })
  @IsString()
  name: string;

  @ApiProperty({ type: String, format: 'binary', name: 'avatar' })
  @IsOptional()
  avatar: string;

  @ApiProperty({
    type: String,
    name: 'phone',
    description: 'Numéro de téléphone',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    enum: RoleArbitre,
    name: 'role',
    required: false,
    default: RoleArbitre.PRINCIPAL,
  })
  @IsOptional()
  @IsEnum(RoleArbitre)
  role?: RoleArbitre;
}

export class UpdateArbitreDTO extends PartialType(ArbitreAccountDto) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID',
  })
  @IsString()
  @IsUUID()
  id: string;
}
