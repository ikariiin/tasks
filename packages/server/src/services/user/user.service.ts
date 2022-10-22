import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SignupDto, User, ErrorStrings } from "@tasks/common";
import { Repository } from "typeorm";
import { ProfileService } from "../profile";
import * as argon2 from "argon2";

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
  ) {}

  public async getUser(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  public async createUser(signupDto: SignupDto): Promise<User> {
    // Check if user exists already
    const userCheck = await this.getUser(signupDto.username);
    if (userCheck) {
      throw new ConflictException({
        message: ErrorStrings.UsernameAlreadyExists,
      });
    }

    const creationUser = new User({
      username: signupDto.username,
      password: await argon2.hash(signupDto.password),
      email: signupDto.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: new Date(),
    });

    const user = await this.userRepository.save(creationUser);
    // TODO:
    // const profile = await this.profileService.createProfile(user);

    return user;
  }
}
