import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class MvpAccountDto {

  @ApiProperty({
    type: String,
    description: "ID du joueur pour lequel on vote",
  })
  @IsString()
  playerId: string;

  @ApiProperty({
    type: String,
    description: "ID de l'utilisateur qui vote",
  })
  @IsString()
  userId: string;
}
