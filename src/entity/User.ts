import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { RefreshToken } from "./RefreshToken";
import { IsEmail } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name: string | null;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => RefreshToken, (rt) => rt.user)
  refreshTokens: RefreshToken[];
}
