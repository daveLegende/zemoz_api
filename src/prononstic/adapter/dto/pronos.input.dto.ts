import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PronoState } from '../../domain';

export class PrononsticAccoutDTO {
  @ApiProperty({
    type: String,
    name: 'user',
    description: "ID de l'utilisateur",
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  user: string;

  @ApiProperty({
    type: String,
    name: 'match',
    description: 'ID du match',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  match: string;

  @ApiProperty({
    type: Number,
    name: 'homeScore',
    description: 'Score de l\équipe domicile',
  })
  @IsNumber()
  homeScore: number;

  @ApiProperty({
    type: Number,
    name: 'awayScore',
    description: 'Score de l\équipe exterieure',
  })
  @IsNumber()
  awayScore: number;

  @ApiProperty({
    type: Date,
    name: 'date',
    description: 'La date du prononstic',
    required: false,
  })
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'Type de match', enum: PronoState })
  @IsEnum(PronoState)
  etat: PronoState;
}

export class UpdatePrononsticDTO extends PartialType(PrononsticAccoutDTO) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID de Prononstic',
  })
  @IsString()
  @IsUUID()
  id: string;
}
