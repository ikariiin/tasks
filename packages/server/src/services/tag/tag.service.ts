import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTagDto, Tag, TagDto, User } from "@tasks/common";
import { Repository } from "typeorm";
import { BoardService } from "../board/board.service";

@Injectable()
export class TagService {
  public constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @Inject(forwardRef(() => BoardService))
    private readonly boardService: BoardService,
  ) {}

  public async createTag(tagDto: CreateTagDto, user: User) {
    const newTag = new Tag({
      ...tagDto,
      owner: user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (tagDto.boardId) {
      const board = await this.boardService.getBoard(user, tagDto.boardId);

      newTag.board = board;
    }

    const savedTag = await this.tagRepository.save(newTag);

    return new TagDto(savedTag);
  }
}
