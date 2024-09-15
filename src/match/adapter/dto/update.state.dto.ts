import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsEnum, IsNumber } from 'class-validator';
import { EventType, MatchState } from 'src/match/domain';

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



