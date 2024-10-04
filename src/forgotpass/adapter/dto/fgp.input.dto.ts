import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class ForgotPassAccountDto {
    
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

export class UpdateForgotPassDTO extends PartialType(ForgotPassAccountDto) {
    @ApiProperty({
      type: String,
      name: 'id',
      description: 'ID de l\'ForgotPass',
    })
    @IsString()
    @IsUUID()
    id: string;
  }