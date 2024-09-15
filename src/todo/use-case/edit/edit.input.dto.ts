import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { CreateTodoDTO } from '../add/add.input.dto';

export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'The ID of the task',
  })
  @IsString()
  @IsUUID()
  id: string;
}
