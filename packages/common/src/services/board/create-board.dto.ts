import { IsString } from "class-validator";

export class CreateBoardDto {
  @IsString()
  public name!: string;

  @IsString()
  public description!: string;
}
