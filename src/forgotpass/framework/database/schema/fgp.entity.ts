import { ForgotPass } from "src/forgotpass/domain";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('forgotpass')
export class ForgotPassEntity extends ForgotPass {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    code: string;

    @Column()
    email: string;
}