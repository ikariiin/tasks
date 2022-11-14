import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "../board/board.model";
import { Preference } from "../preference/preference.model";
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
  @Exclude()
  public password!: string;

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;

  @Column({ nullable: true })
  public lastLoginAt!: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  public profile!: Profile;

  @OneToMany(() => Board, (board) => board.owner)
  public ownBoards!: Board[];

  @OneToMany(() => Board, (board) => board.members)
  public memberBoards!: Board[];

  @OneToOne(() => Preference, (preference) => preference.user, {
    cascade: true,
  })
  @JoinColumn()
  public preference!: Preference;
}
