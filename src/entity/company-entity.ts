import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, OneToMany } from "typeorm";
import { CompanyUser } from "./company-user-entity";

@Entity({ name: 'companies' })
export class Company {

    @PrimaryColumn({ length: 11, nullable: false, unique: true })
    uen: string;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({ default: false, nullable: false })
    is_employment_agency: boolean;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deleted_at?: Date;

    @OneToMany(type => CompanyUser, companyUser => companyUser.company)
    company_users: CompanyUser[];
}