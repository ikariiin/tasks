import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller({
  path: "/",
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  public async index(): Promise<Record<string, string>> {
    return this.appService.getIndex();
  }
}
