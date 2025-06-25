import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
import { PronoState } from 'src/prononstic/domain';

export class DocPrononsticOutputDTO {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID de Prononstic',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    type: String,
    name: 'user',
    description: 'id de l\'user',
  })
  @IsString()
  @IsUUID()
  user: string;

  @ApiProperty({
    type: String,
    name: 'match',
    description: 'id de l\'user',
  })
  @IsString()
  @IsUUID()
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
    required: false
  })
  @IsOptional()
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'Type de match', enum: PronoState })
  @IsEnum(PronoState)
  etat: PronoState;
}