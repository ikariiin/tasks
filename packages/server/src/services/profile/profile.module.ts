import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "@tasks/common";
import { UserModule } from "../user";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  exports: [TypeOrmModule, ProfileService],
  providers: [ProfileService],
})
export class ProfileModule {}
