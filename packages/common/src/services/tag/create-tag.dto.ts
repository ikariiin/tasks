import { IsOptional, IsString, IsUUID, Length } from "class-validator";
import { Config } from "../config";

export class CreateTagDto {
  public constructor(partial: Partial<CreateTagDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  public name!: string;

  @IsString()
  @Length(Config.HEX_COLOR_MIN_LENGTH, Config.HEX_COLOR_MAX_LENGTH)
  public color!: string;

  @IsString()
  @Length(Config.HEX_COLOR_MIN_LENGTH, Config.HEX_COLOR_MAX_LENGTH)
  public contrastText!: string;

  @IsString()
  @IsUUID(Config.UUID_VERSION)
  @IsOptional()
  public boardId?: string;
}
