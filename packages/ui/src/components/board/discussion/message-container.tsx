import { Box, styled } from "@mui/material";
import { MessageDto } from "@tasks/common";
import React from "react";

export interface MessageContainerProps {
  messages: MessageDto[];
}

export const Container = styled(Box)(() => ({
  flexGrow: 1,
  overflow: "auto",
}));

export const MessageContainer = ({ messages }: MessageContainerProps) => {
  return (
    <Container>
      <div>message container</div>
    </Container>
  );
};
