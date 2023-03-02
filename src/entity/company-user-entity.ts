import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { Company } from "./company-entity";

export enum UserRole {
    VIEWER = "viewer",
    SIGNER = "signer"
}

@Entity({ name: 'company_users' })
export class CompanyUser {

    @PrimaryGeneratedColumn("uuid")
    guid: string;

    @Column({ type: "string", length: "11", nullable: false })
    company_uen: string;

    @ManyToOne(type => Company, company => company.company_users)
    @JoinColumn({ name: "company_uen" })
    company: Company;

    @Column({ length: 100, nullable: false })
    first_name: string;

    @Column({ length: 100, nullable: false })
    last_name: string;

    @Column({ length: 150, nullable: false })
    email: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.SIGNER
    })
    role: UserRole;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at!: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deleted_at?: Date;
}