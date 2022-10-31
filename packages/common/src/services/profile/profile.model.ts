import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user.model";

@Entity()
export class Profile {
  public constructor(partial: Partial<Profile>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public avatar!: string;

  @Column()
  public description!: string;

  @Column()
  public role!: string;

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;

  @OneToOne(() => User, (user) => user.profile, {
    cascade: true,
  })
  @JoinColumn()
  public user!: User;
}
