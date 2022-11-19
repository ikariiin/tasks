import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Board,
  CreateTagDto,
  ErrorStrings,
  Tag,
  TagDto,
  User,
} from "@tasks/common";
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

  public async getTagsByUser(user: User) {
    const tags = await this.tagRepository.find({
      where: { owner: { id: user.id } },
    });

    return tags.map((tag) => new TagDto(tag));
  }

  public async getTagsByBoard(boardId: string) {
    const tags = await this.tagRepository.find({
      where: { board: { id: boardId } },
      relations: ["board", "owner"],
    });

    return tags.map((tag) => new TagDto(tag));
  }

  public async removeTagFromBoard(tagId: string, boardId: string) {
    const tag = await this.tagRepository.findOne({
      where: { id: tagId, board: { id: boardId } },
    });

    if (!tag) {
      throw new NotFoundException(ErrorStrings.TagNotFound);
    }
    tag.board = null;

    return this.tagRepository.save(tag);
  }

  public async addTagToBoard(tagId: string, board: Board) {
    const tag = await this.tagRepository.findOne({
      where: { id: tagId },
    });

    if (!tag) {
      throw new NotFoundException(ErrorStrings.TagNotFound);
    }

    tag.board = board;

    return this.tagRepository.save(tag);
  }
}
