import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class DocParisOutputDto {
  @ApiProperty({ description: 'Identifiant du match', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'ID du match', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  matchId: string;

  @ApiProperty({ description: 'odd', example: '1.2' })
  @IsNumber()
  odd: number;

  @ApiProperty({ 
    description: 'Option pariée', 
    enum: ['V1', 'X', 'V2'],
    example: 'V1'
  })
  @IsEnum(['V1', 'X', 'V2'])
  type: 'V1' | 'X' | 'V2';


  @ApiProperty({ 
    description: 'Etat du pari', 
    enum: ['Pending', 'Lost', 'Won'],
    example: 'Pending'
  })
  @IsEnum(['Pending', 'Lost', 'Won'])
  state: 'Pending' | 'Lost' | 'Won';

  @ApiProperty({ description: 'Montant misé', example: 100 })
  @IsNumber()
  @Min(1, { message: 'La mise doit être au moins de 1' })
  amount: number;

  @ApiProperty({ description: 'Montant gagné', example: 100 })
  @IsNumber()
  @Min(1, { message: 'La mise doit être au moins de 1' })
  potentialGain: number;
  
  @ApiProperty({ description: 'is won', example: 'true' })
  @IsBoolean()
  isWon: boolean;

  @ApiProperty({ description: 'is paid', example: 'false' })
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty({ description: 'ID de l\'utilisateur', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  userId: string;
}