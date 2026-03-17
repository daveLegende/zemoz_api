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
    description: "ID du joueur pour lequel on vote",
    })
    @IsUUID()
    playerId: string;

    @ApiProperty({
    type: String,
    description: "ID de l'utilisateur qui vote",
    })
    @IsUUID()
    userId: string;
}