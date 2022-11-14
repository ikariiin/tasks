import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Preference } from "@tasks/common";
import { UserModule } from "../user";
import { PreferenceController } from "./preference.controller";
import { PreferenceService } from "./preference.service";

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Preference]),
  ],
  controllers: [PreferenceController],
  exports: [TypeOrmModule, PreferenceService],
  providers: [PreferenceService],
})
export class PreferenceModule {}
