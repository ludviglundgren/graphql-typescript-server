import * as bcrypt from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
