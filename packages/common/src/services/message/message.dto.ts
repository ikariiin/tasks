import { AttachmentDto, PublicUserDto } from "..";

export class MessageDto {
  public text!: string;
  public attachments!: AttachmentDto[];
  public author!: PublicUserDto;
  public createdAt!: Date;
  public updatedAt!: Date;
}
