import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, IsNumber, IsEnum } from "class-validator";
import { EventType } from "../../../match/domain";

export class MatchEventDTO {
    @ApiProperty({ description: 'Id du match', type: String })
    @IsString()
    @IsUUID() 
    match: string;

    @ApiProperty({ description: 'Type d\'événement du match (ex. : But, Carton rouge)', example: 'GOAL', type: EventType })
    @IsEnum(EventType)
    type: EventType;
    
    @ApiProperty({ description: 'id de l\'equipe', type: String })
    @IsString()
    @IsUUID() 
    equipe: string;
  
    @ApiProperty({ description: 'id du joueur', type: String })
    @IsString()
    @IsUUID() 
    joueur: string;
  
    @ApiProperty({ description: 'minuite de events', type: Number })
    @IsString()
    @IsNumber()
    minute: number;
  }

  export class UpdateMatchEventDto extends MatchEventDTO {
    @ApiProperty({
        type: String,
        name: 'id',
        description: 'ID de Match',
      })
      @IsString()
      @IsUUID()
      id: string;
  }