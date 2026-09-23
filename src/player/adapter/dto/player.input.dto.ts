import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class PlayerAccoutDTO {

  @ApiProperty({ type: String, name: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, name: 'age', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  age?: number;

  @ApiProperty({ type: String, name: 'phone', required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({
    type: String,
    name: 'team',
    description: "Équipe d'inscription initiale (uuid). Sert à créer la première ligne TeamPlayer, pas une FK sur Player.",
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsString()
  @IsUUID()
  team: string;

  @ApiProperty({ type: Number, name: 'numeroMaillot', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  numeroMaillot?: number;

  @ApiProperty({ type: String, name: 'poste', required: false })
  @IsOptional()
  @IsString()
  poste?: string;

  @ApiProperty({ type: String, name: 'statut', required: false })
  @IsOptional()
  @IsString()
  statut?: string;

  @ApiProperty({ type: String, format: 'binary', name: 'avatar' })
  @IsOptional()
  avatar?: string;
}

export class UpdatePlayerDTO extends PartialType(PlayerAccoutDTO) {
  @ApiProperty({ type: String, name: 'id' })
  @IsString()
  @IsUUID()
  id: string;
}

export class TeamPlayerInputDTO {
  @ApiProperty({ type: String, name: 'playerId', required: false })
  @IsOptional()
  @IsUUID()
  playerId?: string;

  @ApiProperty({ type: String, name: 'teamId' })
  @IsUUID()
  teamId: string;

  @ApiProperty({ type: Number, name: 'numeroMaillot', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  numeroMaillot?: number;

  @ApiProperty({ type: String, name: 'poste', required: false })
  @IsOptional()
  @IsString()
  poste?: string;

  @ApiProperty({ type: String, name: 'statut', required: false })
  @IsOptional()
  @IsString()
  statut?: string;
}

export class UpdateTeamPlayerDTO extends PartialType(TeamPlayerInputDTO) {
  @ApiProperty({ type: String, name: 'id', description: "ID de l'inscription TeamPlayer" })
  @IsString()
  @IsUUID()
  id: string;
}
