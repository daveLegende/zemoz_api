import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { Team } from "../../../team/domain";

export class DocPouleOutputDto {
    @ApiProperty({
        type: String,
        name: 'id',
    })
    @IsString()
    id: string;

    @ApiProperty({
        type: String,
        name: 'nom de la poule',
        description: 'exemple POULE A',
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: Team,
        isArray: true,
        name: 'equipes',
        description: 'Quatre équipes',
    })
    @IsArray()
    joueurs: Team[];
}