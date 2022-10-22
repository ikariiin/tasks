import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { User } from "@tasks/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
