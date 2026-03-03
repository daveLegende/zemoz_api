import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class AdminAccountDto {

    @ApiProperty({ type: String, name: 'nom' })
    @IsOptional()
    nom?: string;
    
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

export class UpdateAdminDTO extends PartialType(AdminAccountDto) {
    @ApiProperty({
      type: String,
      name: 'id',
      description: 'ID de l\'Admin',
    })
    @IsString()
@IsUUID()
id: string;
}