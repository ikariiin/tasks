import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "../";

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  url!: string;

  @Column()
  size!: number;

  @Column()
  type!: string;

  @Column()
  createdAt!: Date;

  @ManyToOne(() => Message, (message) => message.attachments)
  message!: Message;
}
