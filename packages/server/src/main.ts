import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "debug", "log", "verbose"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    credentials: true,
    origin: "http://localhost:7000",
  });
  app.setGlobalPrefix("api");

  const configService = app.get(ConfigService);

  await app.listen(configService.get<string>("PORT") || 6666, () => {
    console.log(`Server is running on port ${configService.get("PORT")}`);
  });
}
bootstrap();
