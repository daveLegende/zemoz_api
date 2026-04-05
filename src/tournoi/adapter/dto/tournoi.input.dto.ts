import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Player } from '../../../player/domain';

export class TournoiAccoutDTO {
  @ApiProperty({
    type: String,
    name: 'name',
    description: 'Nom du Tournoi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    name: 'editionName',
    description: 'nom d\' édition',
  })
  @IsString()
  @IsOptional()
  editionName: string;

  @ApiProperty({
    type: Number,
    name: 'edition',
    description: 'Quellième edition du Tournoi',
    required: false
  })
  @IsOptional()
  @IsInt()
  edition?: number;

  @ApiProperty({
    type: Date,
    name: 'annee',
    description: 'Année du tournoi',
    required: false
  })
  @IsOptional()
  @IsDate()
  annee?: Date;
}

export class UpdateTournoiDTO extends PartialType(TournoiAccoutDTO) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID de Tournoi',
  })
  @IsString()
  @IsUUID()
  id: string;
}