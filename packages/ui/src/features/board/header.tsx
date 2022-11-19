import { Box, IconButton, Stack, styled, Typography } from "@mui/material";
import { BoardDto } from "@tasks/common";
import React from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Tag } from "../../components/tag";
import { cutText } from "../../services/utils/text";
import { TabContainer } from "./tab-container";

const Header = styled("header")(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: `rgba(255, 255, 255, 0.05)`,
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  backdropFilter: "blur(5px)",
  position: "relative",
}));

export interface BoardHeaderProps {
  board: BoardDto;
  title: string;
  description: string;
}

export const BoardHeader = ({
  board,
  title,
  description,
}: BoardHeaderProps) => {
  const [minimized, setMinimized] = React.useState(true);

  return (
    <Header>
      <Stack
        direction={minimized ? "row" : "column"}
        spacing={1}
        alignItems={minimized ? "center" : "flex-start"}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant={minimized ? "h6" : "h4"}>{title}</Typography>
          {board.tags.map((tag) => (
            <Tag key={tag.id} tag={tag} size="small" />
          ))}
        </Stack>
        <Box
          sx={{
            flexGrow: minimized ? 1 : 0,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {minimized ? cutText(description, 80) : description}
          </Typography>
        </Box>
        <TabContainer boardId={board.id} />
        <IconButton
          sx={{
            position: minimized ? "relative" : "absolute",
            top: minimized ? 0 : 12,
            right: minimized ? 0 : 16,
          }}
          onClick={() => setMinimized((prevValue) => !prevValue)}
        >
          {minimized ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
        </IconButton>
      </Stack>
    </Header>
  );
};
