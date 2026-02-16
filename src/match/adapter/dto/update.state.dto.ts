import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsEnum, IsNumber, ValidateNested, IsOptional } from 'class-validator';
import { EventType, MatchState } from 'src/match/domain';
import { OddsDTO } from './odds.dto';
import { Type } from 'class-transformer';

export class UpdateStateDto {
    @ApiProperty({
        type: String,
        name: 'id',
        description: 'ID de Match',
    })
    @IsString()
    @IsUUID()
    id: string;
  
    @ApiProperty({ description: 'État du match', enum: MatchState, required: true })
    @IsEnum(MatchState)
    etat: MatchState;
  }


  export class UpdateMatchScoreEventDto {
    @ApiProperty({
        type: String,
        name: 'id',
        description: 'ID de Match',
    })
    @IsString()
    @IsUUID()
    id: string;

    @ApiProperty({
        type: String,
        name: 'id',
        description: 'ID de team',
    })
    @IsString()
    @IsUUID()
    teamId: string;

    @ApiProperty({
        type: String,
        name: 'id',
        description: 'ID de player',
    })
    @IsString()
    @IsUUID()
    playerId: string;

    @ApiProperty({
        type: Number,
        name: 'minuite',
    })
    @IsNumber()
    minuite: number;

    @ApiProperty({ description: 'type event', type: EventType })
    @IsEnum(EventType)
    eventType: EventType;

    @ApiProperty({
        type: Number,
        name: 'homeScore',
    })
    @IsNumber()
    homeScore: number;

    @ApiProperty({
        type: Number,
        name: 'awayScore',
    })
    @IsNumber()
    awayScore: number;
}


export class UpdateMatchPenaltyStateDto {
    @ApiProperty({
        type: String,
        name: 'id',
        description: 'ID de Match',
    })
    @IsString()
    @IsUUID()
    id: string;
}

export class UpdateMatchPenaltyScoreDto {
    @ApiProperty({
        type: String,
        name: 'id',
        description: 'ID de Match',
    })
    @IsString()
    @IsUUID()
    id: string;

    @ApiProperty({
        type: Number,
        name: 'homePenalty',
    })
    @IsNumber()
    homePenalty: number;

    @ApiProperty({
        type: Number,
        name: 'awayPenalty',
    })
    @IsNumber()
    awayPenalty: number;
}


export class UpdateOddsStateDto {
    @ApiProperty({ description: 'les cotes du match', type: OddsDTO })
    @ValidateNested()  // Valide l'objet imbriqué
    @Type(() => OddsDTO)  // Nécessaire pour la transformation class-transformer
    @IsOptional()
    odds?: OddsDTO;  // Plus optionnel
}


