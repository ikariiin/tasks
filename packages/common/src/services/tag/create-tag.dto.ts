import { IsOptional, IsString, IsUUID, Length } from "class-validator";
import { Config } from "../config";

export class CreateTagDto {
  @IsString()
  public name!: string;

  @IsString()
  @Length(Config.HEX_COLOR_LENGTH, Config.HEX_COLOR_LENGTH)
  public color!: string;

  @IsString()
  @Length(Config.HEX_COLOR_LENGTH, Config.HEX_COLOR_LENGTH)
  public contrastText!: string;

  @IsString()
  @IsUUID(Config.UUID_VERSION)
  @IsOptional()
  public boardId?: string;
}
