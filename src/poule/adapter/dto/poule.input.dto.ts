import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';
import { Team } from '../../../team/domain';

export class PouleAccountDto {
  @ApiProperty({
    type: String,
    name: 'nom de la poule',
    description: 'exemple POULE A',
    uniqueItems: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: [String],
    name: 'equipes',
    description: 'Liste des IDs des 4 équipes',
    example: [
      'd290f1ee-6c54-4b01-90e6-d701748f0851',
      'a123f1ee-6c54-4b01-90e6-d701748f0852',
    ],
  })
  @IsArray()
  equipes: string[];
}

export class UpdatePouleDTO extends PartialType(PouleAccountDto) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID de team',
  })
  @IsString()
  @IsUUID()
  id: string;
}
