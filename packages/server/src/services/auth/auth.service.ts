import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user";
import * as argon2 from "argon2";
import { ErrorStrings, PublicUserDto, SignupDto, User } from "@tasks/common";

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getUser(username);
    if (!user)
      throw new NotFoundException({
        message: ErrorStrings.UserNotFound,
      });

    const valid = await argon2.verify(user.password, password);
    if (!valid)
      throw new UnauthorizedException({
        message: ErrorStrings.InvalidPassword,
      });

    return user;
  }

  public async signin(user: User): Promise<PublicUserDto> {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      email: user.email,
      username: user.username,
      token: this.jwtService.sign(payload),
    };
  }

  public async signup(signupDto: SignupDto): Promise<PublicUserDto> {
    const user = await this.userService.createUser(signupDto);
    return this.signin(user);
  }
}
