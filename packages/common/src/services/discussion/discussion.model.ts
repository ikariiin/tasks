import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board, Message } from "../";

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Board, (board) => board.discussion)
  board!: Board;

  @OneToMany(() => Message, (message) => message.discussion, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  messages!: Message[];

  @Column()
  lastMessageAt!: Date;
}
