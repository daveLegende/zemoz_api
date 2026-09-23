import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class MvpAccountDto {
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
    description: "ID du joueur (optionnel, rétrocompatibilité)",
    required: false,
  })
  @IsOptional()
  @IsString()
  playerId?: string;

  @ApiProperty({
    type: String,
    description: "ID de l'utilisateur qui vote",
  })
  @IsString()
  userId: string;
}
