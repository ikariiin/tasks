import { MessageDto, UserMessageDto, generateRoomName } from "@tasks/common";
import { Paper, styled } from "@mui/material";
import React, { useContext } from "react";
import io, { Socket } from "socket.io-client";

import { BoardContext } from "../../context";
import { MessageContainer } from "../../../../components/board/discussion/message-container";
import { MessageInput } from "../../../../components/board/discussion/message-input";
import { RootState } from "../../../../services/store";
import { useSelector } from "react-redux";

const Container = styled(Paper)(() => ({
  display: "flex",
  height: "100%",
  flexDirection: "column",
}));

export const Discussion = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<MessageDto>>([]);
  const [room, setRoom] = React.useState<string | undefined>(undefined);

  const { board, boardId } = useContext(BoardContext);

  const socket = React.useRef<Socket>();

  const auth = useSelector((state: RootState) => state.auth);

  if (!boardId || !board) {
    return null;
  }

  // Join the room
  function join() {
    if (!boardId || !socket.current) {
      return;
    }

    const roomName = generateRoomName(boardId);
    setRoom(roomName);
    socket.current.emit("room-join", roomName);
  }

  // Handle incoming messages
  function onMessage(message: MessageDto): void {
    setMessages((prev) => [...prev, message]);
  }

  // Attach all the connect and disconnect handlers
  const attachSocketHandlers = () => {
    if (!socket.current) {
      return;
    }

    socket.current.on("connect", () => {
      setIsConnected(true);
      setTimeout(() => {
        join();
      }, 2000);
    });

    socket.current.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.current.on("message", onMessage);
  };

  const onDisconnect = () => {
    if (!socket.current) {
      return;
    }

    socket.current.disconnect();
    socket.current.off("connect");
    socket.current.off("disconnect");
    socket.current = undefined;
  };

  React.useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:3000/message", {
        extraHeaders: {
          Authorization: `Bearer ${auth.user?.token}`,
        },
      });
    }
    attachSocketHandlers();

    return onDisconnect;
  }, []);

  const onSend = (message: UserMessageDto) => {
    if (!socket.current) {
      return;
    }

    socket.current.emit("message", message);
  };

  return (
    <Container>
      <MessageContainer messages={messages} />
      <MessageInput
        connected={isConnected}
        onSubmit={onSend}
        room={room ?? ""}
      />
    </Container>
  );
};
