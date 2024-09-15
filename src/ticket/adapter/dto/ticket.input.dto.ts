import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
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

  // @ApiProperty({
  //   type: String,
  //   name: 'match',
  //   description: 'id du match',
  //   nullable: true
  // })
  // @IsOptional()
  // @IsString()
  // match?: string;
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