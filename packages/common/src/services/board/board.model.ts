import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user";

@Entity()
export class Board {
  public constructor(partial: Partial<Board>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @ManyToOne(() => User, (user) => user.ownBoards, {
    cascade: true,
    eager: true,
  })
  public owner!: User;

  @ManyToMany(() => User, (user) => user.memberBoards, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  public members!: User[];

  @Column()
  public name!: string;

  @Column()
  public description!: string;

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;
}
