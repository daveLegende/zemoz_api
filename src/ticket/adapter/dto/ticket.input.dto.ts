import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TicketDuration, TicketState, TicketType } from 'src/ticket/domain/ticket.enum';

export class TicketAccoutDTO {
  @ApiProperty({ description: 'VIP ou STANDARD', enum: TicketType })
  @IsEnum(TicketType)
  type: TicketType;

  @ApiProperty({ description: 'Abonnement ou simple', enum: TicketDuration })
  @IsEnum(TicketDuration)
  duree: TicketDuration;

  @ApiProperty({ description: 'VALIDE ou UTILISER ou SUPPRIMER', enum: TicketState })
  @IsEnum(TicketState)
  etat: TicketState;

  @ApiProperty({
    type: String,
    name: 'user',
    description: 'ID de l\'utilisateur',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  user: string;

  @ApiProperty({
    type: Number,
    name: 'amount',
    description: 'montant du ticket',
    required: true,
  })
  @IsInt()
  amount: number;

  @ApiProperty({ description: 'Date d\'achat du ticket', type: Date, example: '2024-08-25T14:00:00Z' })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ description: 'Date du dernier scan', type: Date, nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastScanDate?: Date;

  @ApiProperty({
    type: [String],
    name: 'matchs',
    description: 'Liste des IDs des matchs',
    example: ['d290f1ee-6c54-4b01-90e6-d701748f0851', 'a123f1ee-6c54-4b01-90e6-d701748f0852'],
    default: []
  })
  @IsOptional()
  @IsArray()
  matchs?: string[];



  @ApiProperty({
    type: Boolean,
    name: 'isDeleted',
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}

export class UpdateTicketDTO extends PartialType(TicketAccoutDTO) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID de Ticket',
  })
  @IsString()
  @IsUUID()
  id: string;
}