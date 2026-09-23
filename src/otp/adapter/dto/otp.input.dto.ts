import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsOptional, IsString, IsUUID } from "class-validator";

export class OtpAccountDto {
    @ApiProperty({
        type: String,
        name: 'code',
        description: 'otp',
        uniqueItems: true,
    })
    @IsString()
    code: string;

    @ApiProperty({
        type: String,
        name: 'phone',
        required: false,
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        type: String,
        name: 'email',
        required: false,
    })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({
        type: Boolean,
        name: 'isVerified',
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    isVerified?: boolean;

    @ApiProperty({
        type: Date,
        name: 'expiresAt',
        description: 'date d\'expiration',
    })
    @IsDate()
    expiresAt: Date;
}

export class UpdateOtpDTO extends PartialType(OtpAccountDto) {
    @ApiProperty({
      type: String,
      name: 'id',
      description: 'ID de l\'Otp',
    })
    @IsString()
    @IsUUID()
    id: string;
}

export class SendOtpDTo {
    @ApiProperty({
        type: String,
        name: 'email',
        required: false,
    })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({
        type: String,
        name: 'phone',
        required: false,
    })
    @IsOptional()
    @IsString()
    phone?: string;
}

export class VerifyOtpDTo {
    @ApiProperty({
        type: String,
        name: 'phone',
        required: false,
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        type: String,
        name: 'email',
        required: false,
    })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({
        type: String,
        name: 'code',
        description: 'otp',
        uniqueItems: true,
    })
    @IsString()
    code: string;
}