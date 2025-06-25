import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";
import { Double } from "typeorm";

export class OddsDTO {

  @ApiProperty({ description: 'Victoire du home', type: Number, example: 'V1' })
  @IsNumber()
  @Min(1, { message: 'La cote V1 doit être ≥ 1' })
  V1: number;

  @ApiProperty({ description: 'Match nul', type: Number, example: 'X' })
  @IsNumber()
  @Min(1, { message: 'La cote X doit être ≥ 1' })
  X: number;

  @ApiProperty({ description: 'Victoire de away', type: Number, example: 'V2' })
  @IsNumber()
  @Min(1, { message: 'La cote V2 doit être ≥ 1' })
  V2: number;
}