import { Box, styled } from "@mui/material";
import { MessageDto } from "@tasks/common";
import React from "react";

export interface MessageContainerProps {
  messages: Array<MessageDto>;
}

export const Container = styled(Box)(() => ({
  flexGrow: 1,
  overflow: "auto",
}));

export const MessageContainer = ({ messages }: MessageContainerProps) => {
  return (
    <Container>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </Container>
  );
};
