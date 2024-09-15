import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { CategoryName } from "src/bet/domain";


export class OddsDto {
    @ApiProperty({ description: 'Cote pour l’équipe V1', example: 1.2 })
    @IsNumber()
    @IsOptional()
    V1?: number;

    @ApiProperty({ description: 'Cote pour l’équipe V2', example: 5.0 })
    @IsNumber()
    @IsOptional()
    V2?: number;

    @ApiProperty({ description: 'Cote pour le match nul (X)', example: 2.5 })
    @IsNumber()
    @IsOptional()
    X?: number;

    @ApiProperty({ description: 'Cote pour les deux equipes marquent (OUI)', example: 2.5 })
    @IsNumber()
    @IsOptional()
    OUI?: number;

    @ApiProperty({ description: 'Cote pour les deux equipes marquent (NON)', example: 2.5 })
    @IsNumber()
    @IsOptional()
    NON?: number;
}

export class BetAccountDto {
    @ApiProperty({
        enum: CategoryName,
        name: 'category',
        description: 'VICTOIRE ou DEUX MARQUENT ou CARTON ROUGE',
    })
    @IsEnum(CategoryName)
    category: CategoryName;

    @ApiProperty({ description: 'Les cotes avec les options', type: OddsDto })
    @ValidateNested()
    @Type(() => OddsDto)
    odds: OddsDto;

    @ApiProperty({
        type: String,
        name: 'match id',
    })
    @IsString()
    match: string;
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