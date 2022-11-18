import { IsDate, IsString, IsUUID } from "class-validator";
import { Tag } from ".";
import { BoardDto } from "../board";
import { PublicUserDto } from "../user/public-user.dto";

export class TagDto {
  public constructor(tag: Tag) {
    this.id = tag.id;
    this.name = tag.name;
    this.color = tag.color;
    this.contrastText = tag.contrastText;
    this.owner = new PublicUserDto(tag.owner);
    if (tag.board) this.board = new BoardDto(tag.board);
    this.updatedAt = tag.updatedAt;
  }

  @IsUUID("4")
  public id!: string;

  @IsString()
  public name!: string;

  @IsString()
  public color!: string;

  @IsString()
  public contrastText!: string;

  public owner!: PublicUserDto;

  public board?: BoardDto;

  @IsDate()
  public updatedAt!: Date;
}
