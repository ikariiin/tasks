import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "../board";
import { User } from "../user";

@Entity()
export class Tag {
  public constructor(partial: Partial<Tag>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Exclude()
  @ManyToOne(() => Board, (board) => board.tags)
  public board?: Board | null;

  @Column()
  public name!: string;

  @Column()
  public color!: string;

  @Column()
  public contrastText!: string;

  @Exclude()
  @ManyToOne(() => User)
  public owner!: User;

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;
}
