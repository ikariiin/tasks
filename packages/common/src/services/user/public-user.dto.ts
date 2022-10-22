import { IsEmail, IsString } from "class-validator";

export class PublicUserDto {
  public constructor(partial: Partial<PublicUserDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  public readonly username!: string;

  @IsString()
  @IsEmail()
  public readonly email!: string;

  @IsString()
  public readonly token!: string;
}
