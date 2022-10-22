import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@tasks/common";
import { ProfileModule } from "../profile";
import { UserService } from "./user.service";

@Module({
  imports: [forwardRef(() => ProfileModule), TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UserService],
  providers: [UserService],
})
export class UserModule {}
