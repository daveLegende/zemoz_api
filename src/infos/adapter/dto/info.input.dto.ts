import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class InfoAccountDto {
  @ApiProperty({ type: String, format: 'binary', name: 'image' })
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

export class UpdateInfoDTO extends PartialType(InfoAccountDto) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: "ID de l'info",
  })
  @IsString()
  @IsUUID()
  id: string;
}
