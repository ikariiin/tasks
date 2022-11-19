import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateBoardDto, User } from "@tasks/common";
import * as packageJson from "../../../package.json";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../user";
import { BoardService } from "./board.service";

@Controller({
  path: "board",
  version: packageJson.version,
})
export class BoardController {
  public constructor(private readonly service: BoardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createBoard(
    @CurrentUser() user: User,
    @Body() boardDto: CreateBoardDto,
  ) {
    return this.service.createBoard(boardDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":id")
  public async getBoard(@CurrentUser() user: User, @Param("id") id: string) {
    return this.service.getBoard(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async getBoards(@CurrentUser() user: User) {
    return this.service.getBoards(user);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":id/join")
  public async joinBoard(@CurrentUser() user: User, @Param("id") id: string) {
    return this.service.joinBoard(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":id/leave")
  public async leaveBoard(@CurrentUser() user: User, @Param("id") id: string) {
    return this.service.leaveBoard(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":id/members")
  public async getMembers(@CurrentUser() user: User, @Param("id") id: string) {
    return this.service.getMembers(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(":id/tag/:tagId")
  public async deleteTag(
    @CurrentUser() user: User,
    @Param("id") id: string,
    @Param("tagId") tagId: string,
  ) {
    return this.service.removeTagFromBoard(user, tagId, id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(":id/tag/:tagId")
  public async addTag(
    @CurrentUser() user: User,
    @Param("id") id: string,
    @Param("tagId") tagId: string,
  ) {
    return this.service.addTagToBoard(user, tagId, id);
  }
}
