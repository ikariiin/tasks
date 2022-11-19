import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Board,
  BoardDto,
  CreateBoardDto,
  ErrorStrings,
  User,
} from "@tasks/common";
import { Repository } from "typeorm";
import { TagService } from "../tag/tag.service";
import { UserService } from "../user";

@Injectable()
export class BoardService {
  public constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => TagService))
    private readonly tagService: TagService,
  ) {}

  public async createBoard(boardDto: CreateBoardDto, user: User) {
    const board = new Board({
      ...boardDto,
      owner: user,
      members: [user],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.boardRepository.save(board);
  }

  public async getBoard(user: User, id: string) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
    });

    if (!board) {
      throw new NotFoundException(ErrorStrings.BoardNotFound);
    }

    if (
      board.owner.id !== user.id &&
      !board.members.some((member) => member.id === user.id)
    ) {
      throw new NotFoundException(ErrorStrings.BoardNotFound);
    }

    return board;
  }

  public async getBoards(user: User) {
    const boards = await this.boardRepository.find({
      where: {
        owner: {
          id: user.id,
        },
      },
      loadEagerRelations: true,
    });

    return boards.map((board) => new BoardDto(board));
  }

  public async joinBoard(user: User, id: string) {
    const board = await this.getBoard(user, id);

    if (board.members.some((member) => member.id === user.id)) {
      return board;
    }

    board.members.push(user);

    const updatedBoard = await this.boardRepository.save(board);

    return new BoardDto(updatedBoard);
  }

  public async leaveBoard(user: User, id: string) {
    const board = await this.getBoard(user, id);

    if (board.owner.id === user.id) {
      // If the user is the owner check if there are other members
      if (board.members.length === 1) {
        // If there are no other members, delete the board
        const deletedBoard = await this.boardRepository.softRemove(board);
        return new BoardDto(deletedBoard);
      } else {
        // If there are other members, transfer ownership to the first member
        board.owner = board.members[1];
        board.members = board.members.filter((member) => member.id !== user.id);
      }
    }

    board.members = board.members.filter((member) => member.id !== user.id);

    const updatedBoard = await this.boardRepository.save(board);

    return new BoardDto(updatedBoard);
  }

  public async getMembers(user: User, id: string) {
    const board = await this.getBoard(user, id);

    return board.members.map((member) => new User(member));
  }

  public async removeTagFromBoard(user: User, tagId: string, boardId: string) {
    // Check if the user is the owner of the board
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      throw new NotFoundException(ErrorStrings.BoardNotFound);
    }

    if (board.owner.id !== user.id) {
      throw new ForbiddenException(ErrorStrings.OperationNotAllowed);
    }

    return this.tagService.removeTagFromBoard(tagId, boardId);
  }

  public async addTagToBoard(user: User, tagId: string, boardId: string) {
    // Check if the user is the owner of the board
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      throw new NotFoundException(ErrorStrings.BoardNotFound);
    }

    if (board.owner.id !== user.id) {
      throw new ForbiddenException(ErrorStrings.OperationNotAllowed);
    }

    return this.tagService.addTagToBoard(tagId, board);
  }
}
