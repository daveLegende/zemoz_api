import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { MatchType, MatchState, MatchScores } from '../../../match/domain';
import { MatchEvent } from '../../../matchEvents/domain';
import { Poule } from '../../../poule/domain';
import { Team } from '../../../team/domain';
import { OddsDTO } from './odds.dto';

export class MatchDocOutputDTO {
  @ApiProperty({ description: 'Identifiant du match', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Lieu du match', example: 'Stade Municipal' })
  @IsString()
  lieu: string;

  @ApiProperty({ description: 'Type de match', enum: MatchType })
  @IsEnum(MatchType)
  type: MatchType;

  @ApiProperty({ description: 'État du match', enum: MatchState, required: false })
  @IsOptional()
  @IsEnum(MatchState)
  etat?: MatchState;

  @ApiProperty({ description: 'Numéro de la journée', example: 1, required: false })
  @IsOptional()
  @IsInt()
  journee?: number;

  @ApiProperty({ description: 'Date du match', example: '2024-08-25T14:00:00Z' })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ description: 'Équipe à domicile', type: Team })
  @ValidateNested({ each: true })
  @Type(() => Team)
  home: Team;

  @ApiProperty({ description: 'Équipe à l\'extérieur', type: Team })
  @ValidateNested({ each: true })
  @Type(() => Team)
  away: Team;

  @ApiProperty({ description: 'Scores du match', type: MatchScores, required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MatchScores)
  scores?: MatchScores;

  @ApiProperty({ description: 'Événements du match', type: [MatchEvent], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MatchEvent)
  events?: MatchEvent[];

  @ApiProperty({ description: 'Poule du match', type: Poule, required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Poule)
  poule?: Poule;

  @ApiProperty({ description: 'Si il y a prolongation ou tirs aux buts', type: Boolean })
    // @ValidateNested()
    // @Type(() => Team)
  @IsOptional()
    @IsBoolean()
    isProlongation: boolean;
  
    @ApiProperty({ description: 'Id de team qui est qualifiée', type: String })
    @IsString()
    @IsOptional()
    @IsUUID()
    teamQualify: string;

  @ApiProperty({ description: 'les cotes du match', type: OddsDTO })
  @ValidateNested()  // Valide l'objet imbriqué
  @Type(() => OddsDTO)  // Nécessaire pour la transformation class-transformer
  @IsOptional()
  odds?: OddsDTO;  // Plus optionnel
}
