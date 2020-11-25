import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { RefreshToken } from "./RefreshToken";
import { IsInt } from "class-validator";

@Entity()
export class Claimer {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  redirectUrl: string;

  @Column()
  apiKey: string;

  @Column()
  isActive: boolean;

  @Column()
  @IsInt()
  permissionLevel: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => RefreshToken, (rt) => rt.user)
  refreshTokens: RefreshToken[];
}
