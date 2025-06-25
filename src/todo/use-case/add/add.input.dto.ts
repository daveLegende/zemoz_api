import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ICreateTodoDTO } from './add.interface';

export class CreateTodoDTO implements ICreateTodoDTO {
  @ApiProperty({
    type: String,
    name: 'label',
    description: 'The title of the task',
  })
  @IsString()
  label: string;

  @ApiProperty({
    type: String,
    name: 'description',
    description: 'The description of the task',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, name: 'dueDate' })
  @IsDateString()
  dueDate: Date;
}
