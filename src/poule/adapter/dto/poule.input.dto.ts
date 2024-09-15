import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsString, IsUUID } from "class-validator";
import { Team } from "src/team/domain";

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
        type: String,
        isArray: true,
        name: 'equipes',
        description: 'Quatre équipes',
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