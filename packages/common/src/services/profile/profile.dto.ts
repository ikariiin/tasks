import { IsString } from "class-validator";

export class ProfileDto {
  public constructor(init?: Partial<ProfileDto>) {
    Object.assign(this, init);
  }

  @IsString()
  public name!: string;

  @IsString()
  public avatar!: string;

  @IsString()
  public description!: string;

  @IsString()
  public role!: string;
}
