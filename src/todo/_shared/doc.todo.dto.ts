import { ApiProperty } from '@nestjs/swagger';
import { Todo } from './todo.model';

export class DocTodoOutputDTO implements Todo {
  @ApiProperty({ type: String, name: 'id' })
  id: string;

  @ApiProperty({
    type: String,
    name: 'label',
  })
  label: string;

  @ApiProperty({
    type: String,
    name: 'description',
  })
  description?: string;
  @ApiProperty({
    type: Date,
    name: 'dueDate',
    required: false,
  })
  dueDate: Date;

  @ApiProperty({ type: Boolean, name: 'isActivated' })
  isClosed: boolean;

  @ApiProperty({ type: Boolean, name: 'isActivated' })
  isActivated: boolean;

  @ApiProperty({ type: Date, name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ type: Date, name: 'updatedAt' })
  updatedAt: Date;
}