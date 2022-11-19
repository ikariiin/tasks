import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateTagDto, User } from "@tasks/common";
import * as packageJson from "../../../package.json";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../user";
import { TagService } from "./tag.service";

@Controller({
  path: "tag",
  version: packageJson.version,
})
export class TagController {
  public constructor(private readonly service: TagService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createTag(
    @CurrentUser() user: User,
    @Body()
    tagDto: CreateTagDto,
  ) {
    return this.service.createTag(tagDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getTagsByUser(@CurrentUser() user: User) {
    return this.service.getTagsByUser(user);
  }

  @Get("board/:boardId")
  @UseGuards(JwtAuthGuard)
  public async getTagsByBoard(@Param() { boardId }: { boardId: string }) {
    return this.service.getTagsByBoard(boardId);
  }
}
