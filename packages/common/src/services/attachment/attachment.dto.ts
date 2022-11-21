import { Attachment } from "./attachment.model";

export class AttachmentDto {
  public constructor(attachment: Attachment) {
    this.id = attachment.id;
    this.name = attachment.name;
    this.url = attachment.url;
    this.size = attachment.size;
    this.type = attachment.type;
    this.createdAt = attachment.createdAt;
  }

  public id!: string;
  public name!: string;
  public url!: string;
  public size!: number;
  public type!: string;
  public createdAt!: Date;
}
