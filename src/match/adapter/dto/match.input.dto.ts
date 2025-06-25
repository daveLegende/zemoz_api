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
import { MatchScores, MatchState, MatchType } from 'src/match/domain';
import { MatchEvent } from 'src/matchEvents/domain';
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

  @ApiProperty({ description: 'Arbitres du match', type: [String] })
  @IsArray()
  @IsString({ each: true })
  arbitres: string[];

  @ApiProperty({ description: 'Équipe à domicile', type: String })
  // @ValidateNested()
  // @Type(() => Team)
  @IsString()
  @IsUUID()
  home: string;

  @ApiProperty({ description: 'Équipe à l\'extérieur', type: String })
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

  @ApiProperty({ description: 'Poule du match', type: String, required: false })
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

  @ApiProperty({ description: 'Id de team qui est qualifiée', type: String }) 
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
