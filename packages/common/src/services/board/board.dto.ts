import { Board } from ".";
import { TagDto } from "../tag";
import { PublicUserDto } from "../user/public-user.dto";

export class BoardDto {
  public constructor(board: Board) {
    this.id = board.id;
    this.name = board.name;
    this.owner = new PublicUserDto(board.owner);
    this.members = board.members.map((member) => new PublicUserDto(member));
    this.tags = board.tags.map((tag) => new TagDto(tag));
    this.updatedAt = board.updatedAt;
  }

  public id!: string;

  public name!: string;

  public description!: string;

  public tags!: TagDto[];

  public owner!: PublicUserDto;

  public members!: PublicUserDto[];

  public updatedAt!: Date;
}
