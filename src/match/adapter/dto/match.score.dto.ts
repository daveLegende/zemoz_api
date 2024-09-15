import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class MatchScoresDTO {
    @ApiProperty({ description: 'Score de l\'équipe à domicile', example: 2 })
    @IsInt()
    home: number;
  
    @ApiProperty({ description: 'Score de l\'équipe à l\'extérieur', example: 1 })
    @IsInt()
    away: number;
}