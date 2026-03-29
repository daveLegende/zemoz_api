import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Player } from '../../../player/domain';

export class TeamAccoutDTO {
  @ApiProperty({
    type: String,
    name: 'name',
    description: 'Nom de team',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    name: 'coach',
    description: 'nom du coach',
  })
  @IsOptional()
  @IsString()
  coach: string;

  @ApiProperty({
    type: String,
    name: 'commune',
    description: 'Commune de team',
  })
  @IsOptional()
  @IsString()
  commune: string;

  @ApiProperty({
    type: Number,
    name: 'points',
    description: 'Le points de team',
    required: false
  })
  @IsOptional()
  @IsInt()
  points?: number;

  @ApiProperty({
    type: Number,
    name: 'matchJoues',
    description: 'Le nombre de match joués',
    required: false
  })
  @IsOptional()
  @IsInt()
  matchJoues?: number;

  @ApiProperty({
    type: Number,
    name: 'butMarques',
    description: 'Le nombre de buts marqués',
    required: false
  })
  @IsOptional()
  @IsInt()
  butMarques?: number;

  @ApiProperty({
    type: Number,
    name: 'butConcedes',
    description: 'Le nombre de buts concedés',
    required: false
  })
  @IsOptional()
  @IsInt()
  butConcedes?: number;

  @ApiProperty({
    type: [Object],
    name: 'joueurs',
    description: 'Les joueurs de l\'équipe',
    required: false
  })
  @IsOptional()
  @IsArray()
  joueurs: Player[];

  @ApiProperty({ type: String, format: 'binary', name: 'logo', required: false })
  logo?: string;

  // @ApiProperty({ type: String, name: 'pouke', required: false })
  // poule?: string;
}

export class UpdateTeamDTO extends PartialType(TeamAccoutDTO) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID de team',
  })
  @IsString()
  @IsUUID()
  id: string;
}