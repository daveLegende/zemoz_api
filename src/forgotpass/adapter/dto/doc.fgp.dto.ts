import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class DocInfoOutputDto {
    @ApiProperty({
        type: String,
        name: 'id',
    })
    @IsString()
    id: string;

    @ApiProperty({
        type: String,
        name: 'code',
        description: 'code envoyé sur le mail',
        uniqueItems: true,
    })
    @IsString()
    code: string;

    @ApiProperty({
        type: String,
        name: 'email',
        description: 'user email',
    })
    @IsString()
    email: string;
}