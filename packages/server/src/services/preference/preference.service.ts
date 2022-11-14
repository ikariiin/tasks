import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Preference } from "@tasks/common";
import { Repository } from "typeorm";
import { UserService } from "../user";

@Injectable()
export class PreferenceService {
  public constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
}
