import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { RoleArbitre } from "src/arbitre/domain";

export class DocArbitreOutputDto {
    @ApiProperty({
        type: String,
        name: 'id',
    })
    @IsString()
    id: string;

    @ApiProperty({
        type: String,
        name: 'nom de la Arbitre',
        description: 'Nom complet: AKAKPO Bertin',
    })
    @IsString()
    name: string;

    @ApiProperty({ type: String, format: 'binary', name: 'avatar' })
    @IsOptional()
    avatar?: string;

    @ApiProperty({
        type: String,
        name: 'phone',
        description: 'Numéro de téléphone',
    })
    @IsString()
    phone: string;

    @ApiProperty({ type: String, enum: RoleArbitre, name: 'role', required: false })
    @IsOptional()
    @IsEnum(RoleArbitre)
    role?: RoleArbitre;
}