import { ATimestamp } from 'framework/timestamp.abstract';
import { Todo } from 'todo/_shared';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class TodoEntity extends ATimestamp implements Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp with time zone' })
  dueDate: Date;

  @Column({ default: true })
  isActivated: boolean;

  @Column({ default: true })
  isClosed: boolean;
}
