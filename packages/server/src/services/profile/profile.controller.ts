import { Controller } from "@nestjs/common";
import * as packageJson from "../../../package.json";
import { ProfileService } from "./profile.service";

@Controller({
  path: "/profile",
  version: packageJson.version,
})
export class ProfileController {
  public constructor(private readonly profileService: ProfileService) {}
}
