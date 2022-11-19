import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "@tasks/common";
import { TagModule } from "../tag/tag.module";
import { UserModule } from "../user";
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TagModule),
    TypeOrmModule.forFeature([Board]),
  ],
  controllers: [BoardController],
  exports: [TypeOrmModule, BoardService],
  providers: [BoardService],
})
export class BoardModule {}
