import { Controller } from "@nestjs/common";
import * as packageJson from "../../../package.json";
import { PreferenceService } from "./preference.service";

@Controller({
  path: "preference",
  version: packageJson.version,
})
export class PreferenceController {
  public constructor(private readonly service: PreferenceService) {}
}
