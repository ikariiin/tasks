import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "../tag";
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

  @OneToMany(() => Tag, (tag) => tag.board, {
    cascade: true,
    eager: true,
  })
  public tags!: Tag[];

  @Column()
  public name!: string;

  @Column()
  public description!: string;

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;
}
