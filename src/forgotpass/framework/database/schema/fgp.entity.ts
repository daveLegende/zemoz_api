import { ForgotPass } from "src/forgotpass/domain";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('forgotpass')
export class ForgotPassEntity extends ForgotPass {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    code: string;

    @Column()
    email: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    // Optionnel, si vous souhaitez inclure deletedAt
    @Column({ type: 'timestamp', nullable: true })
    deletedAt?: Date;
}