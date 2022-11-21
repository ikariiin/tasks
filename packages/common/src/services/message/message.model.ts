import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attachment, User, Discussion } from "../";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @OneToMany(() => Attachment, (attachment) => attachment.message, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  attachments!: Attachment[];

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Discussion, (discussion) => discussion.messages)
  discussion!: Discussion;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
