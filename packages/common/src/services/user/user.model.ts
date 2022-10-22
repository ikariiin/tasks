import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "../profile/profile.model";

@Entity()
export class User {
  public constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ unique: true })
  public username!: string;

  @Column({ unique: true })
  public email!: string;

  @Column()
  public password!: string;

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;

  @Column({ nullable: true })
  public lastLoginAt!: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  public profile!: Profile;
}
