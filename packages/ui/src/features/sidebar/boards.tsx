import {
  Alert,
  Box,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { RiDashboardLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { useGetBoardsQuery } from "../../services/api/board";

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  margin: `${theme.spacing(2)} 0`,
}));

const Container = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
}));

export const Boards = () => {
  const { data: boards, error, isLoading } = useGetBoardsQuery();
  const location = useLocation();

  if (isLoading) {
    return (
      <LoadingContainer>
        <LinearProgress
          color="secondary"
          sx={{
            width: "100%",
            mb: 1,
          }}
        />
        <Typography variant="body2">Fetching your boards</Typography>
      </LoadingContainer>
    );
  }

  if (error || !boards) {
    return (
      <Container>
        <Alert severity="error">Couldn&apos;t fetch boards.</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <List dense>
        {boards.map((board) => (
          <NavLink key={board.id} to={`/board/${board.id}`}>
            <ListItemButton
              dense
              sx={{
                borderRadius: 1,
              }}
              selected={location.pathname.includes(`/board/${board.id}`)}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                  mr: 1,
                }}
              >
                <RiDashboardLine />
              </ListItemIcon>
              <ListItemText
                primary={board.name}
                secondary={`${board.members.length} members`}
              />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </Container>
  );
};
