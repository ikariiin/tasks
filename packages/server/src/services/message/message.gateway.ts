import { Logger, UseGuards } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from "@nestjs/websockets";
import { UserMessageDto } from "@tasks/common";
import { Socket } from "socket.io";
import { WsGuard } from "../auth/guards/ws.guard";
import { UserService } from "../user";

// TODO: Implement logic for CORS and authentication
@WebSocketGateway({ namespace: "message", cors: true })
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(MessageGateway.name);
  private socket: Socket | undefined;

  constructor(private readonly userService: UserService) {}

  afterInit() {
    console.log("MessageGateway initialized");
  }

  handleConnection(socket: Socket) {
    this.logger.debug("Client connected");
    this.socket = socket;
  }

  handleDisconnect() {
    this.logger.debug("Client disconnected");
  }

  @UseGuards(WsGuard)
  @SubscribeMessage("message")
  public async handleEvent(
    @MessageBody() data: UserMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    this.logger.debug("Connected room");
    client.in(data.room).emit("message", data);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage("room-join")
  public async handleRoomJoin(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<unknown>> {
    this.logger.debug(`Client joined room ${roomName}`);
    client.join(roomName);
    return { event: "room-join", data: roomName };
  }
}
