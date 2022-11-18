import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "@tasks/common";
import { BoardModule } from "../board/board.module";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";

@Module({
  imports: [forwardRef(() => BoardModule), TypeOrmModule.forFeature([Tag])],
  exports: [TypeOrmModule, TagService],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
