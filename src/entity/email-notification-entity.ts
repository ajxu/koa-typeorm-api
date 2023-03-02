import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CompanyUser } from "./company-user-entity";

@Entity({ name: 'email_notifications' })
export class EmailNotification {
  @PrimaryGeneratedColumn("uuid")
  guid: string;

  @Column({ type: "uuid", length: 36, nullable: false })
  company_user_guid: string;

  @ManyToOne(type => CompanyUser)
  @JoinColumn({ name: "company_user_guid" })
  company_user: CompanyUser;

  @Column({ length: 150, nullable: false })
  email: string;

  @Column({ length: 300, nullable: false })
  sent_status: string;

  @Column({ type: "timestamp" })
  sent_at: Date;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamp" })
  deleted_at?: Date;
}