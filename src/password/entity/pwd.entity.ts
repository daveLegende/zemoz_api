import { ITimestamp } from 'domain/interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Password } from '../dto/pwd.model';

@Entity('passwords')
export class PasswordEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pass: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Optionnel, si vous souhaitez inclure deletedAt
  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
