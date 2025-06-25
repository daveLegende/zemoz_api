import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class PlayerAccoutDTO {
  @ApiProperty({
    type: String,
    name: 'firstname',
    description: 'Le nom de famille',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    type: String,
    name: 'lastname',
    description: 'Prenom du joueur',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    type: Number,
    name: 'age',
    description: 'Age du joueur',
    required: false
  })
  @IsOptional()
  @IsInt()
  age?: number;

  @ApiProperty({
    type: String,
    name: 'phone',
    description:
      'Le numero de téléphone du joueur',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    type: Number,
    name: 'buts',
    description: 'Le nombre de buts marqué',
  })
  @IsOptional()
  @IsInt()
  buts?: number;

  @ApiProperty({
    type: Number,
    name: 'passes',
    description: 'Le nombre de passes d',
  })
  @IsOptional()
  @IsInt()
  passes?: number;

  @ApiProperty({
    type: String,
    name: 'id',
    description: 'id de team',
  })
  @IsString()
  @IsUUID()
  team: string;

  @ApiProperty({ type: String, format: 'binary', name: 'avatar' })
  @IsOptional()
  avatar?: string;
}

export class UpdatePlayerDTO extends PartialType(PlayerAccoutDTO) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID du joueur',
  })
  @IsString()
  @IsUUID()
  id: string;
}