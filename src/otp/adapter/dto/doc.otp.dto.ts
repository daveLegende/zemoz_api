import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

export class DocOtpOutputDto {
    @ApiProperty({
        type: String,
        name: 'id',
    })
    @IsString()
    id: string;

    @ApiProperty({
        type: String,
        name: 'code',
        description: 'otp',
        uniqueItems: true,
    })
    @IsString()
    code: string;

    // @ApiProperty({
    //     type: String,
    //     name: 'phone',
    // })
    // @IsString()
    // phone: string;

    @ApiProperty({
        type: String,
        name: 'email',
    })
    @IsString()
    email: string;

    @ApiProperty({
        type: Date,
        name: 'expiresAt',
        description: 'date d\'expiration',
    })
    @IsDate()
    expiresAt: Date;
}