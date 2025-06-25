import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class DocAdminOutputDto {
    @ApiProperty({
        type: String,
        name: 'id',
    })
    @IsString()
    id: string;

    @ApiProperty({ type: String, name: 'nom' })
    nom: string;
    
    @ApiProperty({
        type: String,
        name: 'email de Admin',
        uniqueItems: true,
    })
    @IsString()
    email: string;

    @ApiProperty({
        type: String,
        name: 'password',
    })
    @IsString()
    password: string;
}