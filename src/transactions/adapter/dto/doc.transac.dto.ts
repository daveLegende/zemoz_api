import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { TransactionType } from "src/transactions/domain";

export class DocTransactionOutputDto {
    @ApiProperty({
        type: String,
        name: 'id',
    })
    @IsString()
    id: string;

    @ApiProperty({
        type: Number,
        name: 'amount',
        description: 'montant du ticket',
        required: true,
    })
    @IsNumber()
    amount: number;

    @ApiProperty({
        type: Number,
        name: 'frais',
        description: 'Frais de pourcentage',
        required: true,
    })
    @IsNumber()
    frais: number;

    @ApiProperty({ description: 'DEPOT ou RETRAIT', enum: TransactionType })
    @IsEnum(TransactionType)
    type: TransactionType;

    @ApiProperty({ description: 'phone du user', type: String })
    @IsString()
    phone: string;

    @ApiProperty({ description: 'Id de l\'admin', type: String })
    @IsUUID()
    @IsOptional()
    @IsString()
    admin?: string;

    @ApiProperty({ description: 'Id de l\'user', type: String })
    @IsUUID()
    @IsOptional()
    @IsString()
    user?: string;
}