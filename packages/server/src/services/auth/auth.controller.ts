import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PrivateUserDto, SignupDto, User } from "@tasks/common";
import { AuthService } from "./auth.service";
import * as packageJson from "../../../package.json";
import { CurrentUser } from "../user";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller({
  path: "/auth",
  version: packageJson.version,
})
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  public async signin(@CurrentUser() user: User): Promise<PrivateUserDto> {
    return this.authService.signin(user);
  }

  @Post("signup")
  public async signup(@Body() signupDto: SignupDto): Promise<PrivateUserDto> {
    return this.authService.signup(signupDto);
  }
}
