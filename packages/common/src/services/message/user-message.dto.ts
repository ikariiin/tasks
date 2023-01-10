import { IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";
import { AttachmentDto } from "../attachment";

export class UserMessageDto {
  public constructor(init?: Partial<UserMessageDto>) {
    Object.assign(this, init);
  }

  @IsNotEmpty()
  @IsString()
  public readonly text!: string;

  @IsArray()
  public readonly attachments!: AttachmentDto[];

  @IsDate()
  public readonly createdAt!: Date;

  @IsDate()
  public readonly updatedAt!: Date;

  @IsString()
  public readonly room!: string;
}
