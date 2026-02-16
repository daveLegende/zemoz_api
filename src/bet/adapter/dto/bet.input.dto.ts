import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsEnum, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, IsUUID, ValidateIf, ValidateNested } from "class-validator";
import { CategoryName } from "src/bet/domain";


// export class OddsDto {
//     @ApiProperty({ description: 'Cote pour l’équipe V1', example: 1.2 })
//     @IsNumber()
//     @IsOptional()
//     V1?: number;

//     @ApiProperty({ description: 'Cote pour l’équipe V2', example: 5.0 })
//     @IsNumber()
//     @IsOptional()
//     V2?: number;

//     @ApiProperty({ description: 'Cote pour le match nul (X)', example: 2.5 })
//     @IsNumber()
//     @IsOptional()
//     X?: number;

//     @ApiProperty({ description: 'Cote pour les deux equipes marquent (OUI)', example: 2.5 })
//     @IsNumber()
//     @IsOptional()
//     OUI?: number;

//     @ApiProperty({ description: 'Cote pour les deux equipes marquent (NON)', example: 2.5 })
//     @IsNumber()
//     @IsOptional()
//     NON?: number;
// }

// export class BetAccountDto {
//     @ApiProperty({
//         enum: CategoryName,
//         name: 'category',
//         description: 'VICTOIRE ou DEUX MARQUENT ou CARTON ROUGE',
//     })
//     @IsEnum(CategoryName)
//     category: CategoryName;

//     @ApiProperty({ description: 'Les cotes avec les options', type: OddsDto })
//     @ValidateNested()
//     @Type(() => OddsDto)
//     odds: OddsDto;

//     @ApiProperty({
//         type: String,
//         name: 'match id',
//     })
//     @IsString()
//     match: string;
// }




// // 1. DTOs spécifiques par catégorie
// export class Odds1X2Dto {
//   @IsNumber() V1: number;
//   @IsNumber() V2: number;
//   @IsNumber() X: number;
// }

// export class OddsOuiNonDto {
//   @IsNumber() OUI: number;
//   @IsNumber() NON: number;
// }

// export class OddsPlayersDto {
//   @ValidateMap() // Custom validator pour UUIDs
//   @IsObject() players: Record<string, number>;
// }

// export class OddsTeamsDto {
//   @IsObject() teams: Record<string, number>;
// }

// // 2. BetAccountDto avec discriminated union
// export class BetAccountDto {
//   @IsEnum(CategoryName) category: CategoryName;
//   @IsString() match: string;

//   // 🔥 MAGIE : odds tapé selon category !
//   @ValidateIf(o => ['VICTOIRE', 'FIRST_HALF_TIME_RESULT'].includes(o.category))
//   @IsDefined()
//   @Type(() => Odds1X2Dto)
//   odds1x2?: Odds1X2Dto;

//   @ValidateIf(o => ['DEUX_MARQUENT'].includes(o.category))
//   @Type(() => OddsOuiNonDto)
//   oddsOuiNon?: OddsOuiNonDto;

//   @ValidateIf(o => ['BUTEUR DU MATCH'].includes(o.category))
//   @Type(() => OddsPlayersDto)
//   oddsPlayers?: OddsPlayersDto;

//   @ValidateIf(o => ['BUTEUR DU MATCH'].includes(o.category))
//   @Type(() => OddsTeamsDto)
//   oddsTeams?: OddsTeamsDto;
// }
// function ValidateMap(): (target: OddsPlayersDto, propertyKey: "players") => void {
//     throw new Error("Function not implemented.");
// }

export class OddsDto {
  @IsObject()
  @IsNotEmptyObject()
  odds: Record<string, number>;
}

export class BetAccountDto {

  @ApiProperty({ description: 'Catégorie du pari', enum: CategoryName, example: CategoryName.COMPETITION_WINNER })
  @IsEnum(CategoryName)
  category: CategoryName;

  @ApiProperty({ description: 'ID du match (optionnel)', required: false, example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsOptional()
  @IsUUID()
  matchId?: string;

  @ApiProperty({ description: 'ID de la compétition (optionnel)', required: false, example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsOptional()
  @IsUUID()
  competitionId?: string;

  @ApiProperty({ description: 'Détails des cotes', type: OddsDto })
  @ValidateNested()
  @Type(() => OddsDto)
  odds: OddsDto;
}





export class UpdateBetDTO extends PartialType(BetAccountDto) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID',
  })
  @IsString()
  @IsUUID()
  id: string;
}