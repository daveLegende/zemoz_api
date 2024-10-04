import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from "class-validator";
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
    @IsInt()
    amount: number;

    @ApiProperty({ description: 'DEPOT ou RETRAIT', enum: TransactionType })
    @IsEnum(TransactionType)
    type: TransactionType;

    @ApiProperty({ description: 'id du user', type: String })
    @IsUUID()
    @IsString()
    user: string;

    @ApiProperty({ description: 'Id de l\'admin', type: String })
    @IsUUID()
    @IsOptional()
    @IsString()
    admin?: string;
}