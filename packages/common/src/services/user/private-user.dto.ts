import { IsEmail, IsString } from "class-validator";

export class PrivateUserDto {
  public constructor(partial: Partial<PrivateUserDto>) {
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
