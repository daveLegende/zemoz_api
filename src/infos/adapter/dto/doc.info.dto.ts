import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DocInfoOutputDto {
  @ApiProperty({
    type: String,
    name: 'id',
  })
  @IsString()
  id: string;

  @ApiProperty({ type: String, format: 'binary', name: 'image' })
  @IsOptional()
  image: string;

  @ApiProperty({
    type: String,
    name: 'titre de la Info',
    description: 'exemple Info A',
    uniqueItems: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    name: 'description de la Info',
    description: 'description',
  })
  @IsString()
  desc: string;
}
