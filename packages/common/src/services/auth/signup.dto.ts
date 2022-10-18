import { IsEmail, IsString } from "class-validator";

export class SignupDto {
  public constructor(partial: Partial<SignupDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  public readonly username!: string;

  @IsString()
  @IsEmail()
  public readonly email!: string;

  @IsString()
  public readonly password!: string;
}
