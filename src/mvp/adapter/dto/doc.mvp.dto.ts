import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, IsUUID } from "class-validator";

export class DocMvpOutputDto {
    @ApiProperty({
        type: String,
        name: 'id',
    })
    @IsString()
    id: string;

    @ApiProperty({
        type: String,
        description: "ID du match pour lequel on vote",
    })
    @IsString()
    matchId: string;

    @ApiProperty({
        type: String,
        description: "ID de l'inscription du joueur (TeamPlayer) pour lequel on vote",
    })
    @IsString()
    teamPlayerId: string;

    @ApiProperty({
        type: String,
        description: "ID de l'utilisateur qui vote",
    })
    @IsString()
    userId: string;
}