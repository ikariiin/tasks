import { User } from "./user.model";

export class PublicUserDto {
  public constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.lastLoginAt = user.lastLoginAt;
  }

  public id!: number;

  public username!: string;

  public email!: string;

  public lastLoginAt!: Date;
}
