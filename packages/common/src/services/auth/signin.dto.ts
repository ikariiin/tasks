import { IsString } from "class-validator";

export class SigninDto {
  public constructor(init?: Partial<SigninDto>) {
    Object.assign(this, init);
  }

  @IsString()
  public username!: string;

  @IsString()
  public password!: string;
}
