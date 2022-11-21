import { Paper, styled } from "@mui/material";
import React from "react";
import { MessageContainer } from "../../../../components/board/discussion/message-container";
import { MessageInput } from "../../../../components/board/discussion/message-input";

const Container = styled(Paper)(() => ({
  display: "flex",
  height: "100%",
  flexDirection: "column",
}));

export const Discussion = () => {
  return (
    <Container>
      <MessageContainer messages={[]} />
      <MessageInput />
    </Container>
  );
};
