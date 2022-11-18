import { styled, Typography } from "@mui/material";
import React from "react";
import { TabContainer } from "./tab-container";

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  backgroundColor: `rgba(255, 255, 255, 0.05)`,
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
}));

export const BoardHeader = ({
  boardId,
  title,
  description,
}: {
  boardId: string;
  title: string;
  description: string;
}) => {
  return (
    <Header>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
      <TabContainer boardId={boardId} />
    </Header>
  );
};
