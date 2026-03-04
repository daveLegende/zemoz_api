import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
    IsEnum,
    IsInt,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';
import { TicketType, TicketDuration, TicketState } from '../../domain/ticket.enum';

export class DocTicketOutputDTO {
    @ApiProperty({ type: String, name: 'id' })
    id: string;

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
    description: 'id de user',
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
  
  @ApiProperty({
    type: Date,
    name: 'date',
    description: 'date du ticket',
  })
  @IsDate()
  date: Date;
  
  @ApiProperty({
    type: String,
    name: 'match',
    description: 'id du match',
    nullable: true
  })
  @IsOptional()
  @IsString()
  match?: string;
}