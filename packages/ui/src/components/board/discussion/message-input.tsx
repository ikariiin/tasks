import { IconButton, styled } from "@mui/material";
import { RiEmotionHappyLine, RiSendPlane2Line } from "react-icons/ri";

import React from "react";
import { UserMessageDto } from "@tasks/common";

const Container = styled("form")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1),
  gap: theme.spacing(1),
}));

const Input = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  flexGrow: 1,
  fontSize: theme.typography.fontSize,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
  backgroundColor: `rgba(0, 0, 0, .45)`,
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
}));

export interface MessageInputProps {
  connected: boolean;
  onSubmit: (message: UserMessageDto) => unknown;
  room: string;
}

export const MessageInput = ({
  connected,
  onSubmit,
  room,
}: MessageInputProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    if (!message) {
      return;
    }

    const userMessage: UserMessageDto = Object.freeze({
      text: message,
      createdAt: new Date(),
      attachments: [],
      updatedAt: new Date(),
      room,
    });

    onSubmit(userMessage);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <IconButton disabled={!connected}>
        <RiEmotionHappyLine />
      </IconButton>
      <Input
        placeholder="Type your message here..."
        name="message"
        type="text"
        disabled={!connected}
      />
      <IconButton color="primary" type="submit" disabled={!connected}>
        <RiSendPlane2Line />
      </IconButton>
    </Container>
  );
};
