import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { CategoryName } from "../../domain";

export class DocBetOutputDto {
    @ApiProperty({
        type: String,
        name: 'id',
        description: 'ID',
    })
    @IsString()
    @IsUUID()
    id: string;


    @ApiProperty({
        enum: CategoryName,
        name: 'category',
        description: 'VICTOIRE ou DEUX MARQUENT ou CARTON ROUGE',
    })
    @IsEnum(CategoryName)
    category: CategoryName;

    @ApiProperty({ description: 'les cotes avec les options', type: Object })
    odds: Record<string, any>;

    @ApiProperty({
        type: String,
        name: 'match id',
    })
    @IsString()
    match: string;
}