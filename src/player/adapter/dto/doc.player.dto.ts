import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPhoneNumber, IsString } from 'class-validator';

export class DocPlayerOutputDTO {
  @ApiProperty({ type: String, name: 'id' })
  id: string;

  @ApiProperty({
    type: String,
    name: 'name',
    description: 'nom complet du joueur',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    name: 'age',
    description: 'Age du joueur',
  })
  @IsInt()
  age: number;

  @ApiProperty({
    type: String,
    name: 'phone',
    description: 'Le numero de téléphone du joueur',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    type: Number,
    name: 'buts',
    description: 'Le nombre de buts marqué',
  })
  @IsInt()
  buts: number;

  @ApiProperty({
    type: Number,
    name: 'passes',
    description: 'Le nombre de passes d',
  })
  @IsInt()
  passes: number;

  @ApiProperty({ type: String, format: 'binary', name: 'avatar' })
  avatar?: string;
}
