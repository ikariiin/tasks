import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Socket } from "socket.io";
import { AuthService } from "../auth.service";

@Injectable()
export class WsGuard implements CanActivate {
  private readonly logger = new Logger(WsGuard.name);

  constructor(private readonly authService: AuthService) {
    this.logger.debug("WsGuard instantiated");
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug("WsGuard canActivate reached");
    const client: Socket = context.switchToWs().getClient();
    const bearerToken = client.handshake.headers.authorization?.split(" ")[1];

    if (!bearerToken) {
      return false;
    }

    try {
      const user = await this.authService.verify(bearerToken);
      context.switchToHttp().getRequest().user = user;

      return Boolean(user);
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
