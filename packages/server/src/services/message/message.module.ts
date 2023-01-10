import { Module } from "@nestjs/common";
import { AuthModule } from "../auth";
import { UserModule } from "../user";
import { MessageGateway } from "./message.gateway";

@Module({
  imports: [AuthModule, UserModule],
  providers: [MessageGateway],
  exports: [],
})
export class MessageModule {}
