import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { HalfPauseState, MatchScores, MatchState, MatchType } from '../../../match/domain';
import { MatchEvent } from '../../../matchEvents/domain';
import { OddsDTO } from './odds.dto';

export class MatchAccoutDTO {
  // @ApiProperty({ description: 'Identifiant du match', example: '123e4567-e89b-12d3-a456-426614174000' })
  // @IsString()
  // id: string;

  @ApiProperty({ description: 'Lieu du match', type: String, example: 'Stade Municipal' })
  @IsString()
  lieu: string;

  @ApiProperty({ description: 'Type de match', enum: MatchType })
  @IsEnum(MatchType)
  type: MatchType;

  @ApiProperty({ description: 'État du match', enum: MatchState, required: false })
  @IsOptional()
  @IsEnum(MatchState)
  etat?: MatchState;

  @ApiProperty({ description: 'Numéro de la journée', type: Number, example: 1, required: false })
  @IsOptional()
  @IsInt()
  journee?: number;

  @ApiProperty({ description: 'Date du match', type: Date, example: '2024-08-25T14:00:00Z' })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ description: 'Liste des IDs des arbitres', type: [String], example: ['d290f1ee-6c54-4b01-90e6-d701748f0851', 'a123f1ee-6c54-4b01-90e6-d701748f0852'] })
  @IsArray()
  @IsString({ each: true })
  arbitres: string[];

  @ApiProperty({ description: 'ID de l\'équipe à domicile', type: String, example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  // @ValidateNested()
  // @Type(() => Team)
  @IsString()
  @IsUUID()
  home: string;

  @ApiProperty({ description: 'ID de l\'équipe à l\'extérieur', type: String, example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  // @ValidateNested()
  // @Type(() => Team)
  @IsString()
  @IsUUID()
  away: string;

  @ApiProperty({ description: 'Scores du match', type: MatchScores, required: false })
  @IsOptional()
  scores?: Record<string, any>;

  @ApiProperty({ description: 'Événements du match', type: MatchEvent, default: [] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MatchEvent)
  @IsArray()
  events?: MatchEvent[];

  @ApiProperty({ description: 'ID de la poule', type: String, required: false, example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsOptional()
  // @ValidateNested()
  // @Type(() => String)
  poule?: string;

  @ApiProperty({ description: 'Si il y a prolongation ou tirs aux buts', type: Boolean })
  @IsOptional()
  // @ValidateNested()
  // @Type(() => Team)
  @IsBoolean()
  isProlongation?: boolean;

  @ApiProperty({ description: 'Match dans les séances de tir aux buts', type: Boolean })
  @IsOptional()
  // @ValidateNested()
  // @Type(() => Team)
  @IsBoolean()
  isTirAuxButs?: boolean;

  @ApiProperty({ description: 'Score de l\'équipe a domicile au tir aux buts', type: Number, example: 1, required: false })
  @IsOptional()
  @IsInt()
  homePenalty?: number;

  @ApiProperty({ description: 'Score de l\'équipe à l\'extérieur au tir aux buts', type: Number, example: 1, required: false })
  @IsOptional()
  @IsInt()
  awayPenalty?: number;

  @ApiProperty({ description: 'ID de l\'équipe qualifiée', type: String, example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsOptional()
  @IsString()
  @IsUUID()
  teamQualify?: string;

  @ApiProperty({ description: 'les cotes du match', type: OddsDTO })
  @ValidateNested()  // Valide l'objet imbriqué
  @Type(() => OddsDTO)  // Nécessaire pour la transformation class-transformer
  @IsOptional()
  odds?: OddsDTO;  // Plus optionnel
}

export class UpdateMatchDTO extends PartialType(MatchAccoutDTO) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID de Match',
  })
  @IsString()
  @IsUUID()
  id: string;
}


export class UpdateHalfTimeDto {
  id: string;
  halfPauseState: HalfPauseState;
}
