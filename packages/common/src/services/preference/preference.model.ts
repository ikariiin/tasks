import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user";

@Entity()
export class Preference {
  public constructor(init?: Partial<Preference>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @OneToOne(() => User, (user) => user.preference)
  public user!: User;
}
