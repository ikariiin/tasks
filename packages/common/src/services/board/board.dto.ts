import { Board } from ".";
import { PublicUserDto } from "../user/public-user.dto";

export class BoardDto {
  public constructor(board: Board) {
    this.id = board.id;
    this.name = board.name;
    this.owner = new PublicUserDto(board.owner);
    this.members = board.members.map((member) => new PublicUserDto(member));
    this.updatedAt = board.updatedAt;
  }

  public id!: string;

  public name!: string;

  public description!: string;

  public owner!: PublicUserDto;

  public members!: PublicUserDto[];

  public updatedAt!: Date;
}
