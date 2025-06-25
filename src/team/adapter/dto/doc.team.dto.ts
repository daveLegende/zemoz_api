import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

export class DocTeamOutputDTO {
    @ApiProperty({ type: String, name: 'id' })
    id: string;
    @ApiProperty({
        type: String,
        name: 'name',
        description: 'Nom de team',
      })
      @IsString()
      name: string;
    
      @ApiProperty({
        type: String,
        name: 'coach',
        description: 'nom du coach',
      })
      @IsString()
      coach: string;
    
      @ApiProperty({
        type: String,
        name: 'commune',
        description: 'Commune de team',
      })
      @IsString()
      commune: string;
    
      @ApiProperty({
        type: Number,
        name: 'points',
        description: 'Le points de team',
      })
      @IsInt()
      points?: number;
    
      @ApiProperty({
        type: Number,
        name: 'matchJoues',
        description: 'Le nombre de match joués',
      })
      @IsInt()
      matchJoues?: number;
    
      @ApiProperty({
        type: Number,
        name: 'butMarques',
        description: 'Le nombre de buts marqués',
      })
      @IsInt()
      butMarques?: number;
    
      @ApiProperty({
        type: Number,
        name: 'butConcedes',
        description: 'Le nombre de buts concedés',
      })
      @IsInt()
      butConcedes?: number;
    
      @ApiProperty({ type: String, format: 'binary', name: 'logo', required: false })
      logo: string;
}