import { Otp } from "../../../domain";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('otp')
export class OtpEntity extends Otp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    code: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column()
    expiresAt: Date;
}