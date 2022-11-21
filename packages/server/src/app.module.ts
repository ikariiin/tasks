import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Profile,
  User,
  Board,
  Tag,
  Preference,
  Discussion,
  Message,
  Attachment,
} from "@tasks/common";
import { AuthModule } from "./services/auth";
import { UserModule } from "./services/user";
import { ProfileModule } from "./services/profile";
import { BoardModule } from "./services/board/board.module";
import { PreferenceModule } from "./services/preference";
import { TagModule } from "./services/tag/tag.module";

const entities = [
  User,
  Profile,
  Board,
  Tag,
  Preference,
  Discussion,
  Message,
  Attachment,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),
        entities,
        synchronize: true,
        logging: "all",
      }),
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    BoardModule,
    PreferenceModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
