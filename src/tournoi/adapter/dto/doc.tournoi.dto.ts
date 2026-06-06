import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class DocTournoiOutputDTO {
  @ApiProperty({ type: String, name: 'id' })
  id: string;
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
    description: "nom d' édition",
  })
  @IsString()
  @IsOptional()
  editionName: string;

  @ApiProperty({
    type: Number,
    name: 'edition',
    description: 'Quellième edition du Tournoi',
    required: false,
  })
  @IsOptional()
  @IsInt()
  edition?: number;

  @ApiProperty({
    type: Date,
    name: 'annee',
    description: 'Année du tournoi',
    required: false,
  })
  @IsOptional()
  @IsDate()
  annee?: Date;
}
