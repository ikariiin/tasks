import { Alert, AlertTitle, Box, Link, styled } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetBoardQuery } from "../../services/api/board";
import { BoardHeader } from "./header";

const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const OutletContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
}));

export const Board = () => {
  const { id } = useParams<{ id: string }>();
  const { data: board, isLoading, error } = useGetBoardQuery(id || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !board) {
    return (
      <Alert severity="error">
        <AlertTitle>Error fetching board details</AlertTitle>
        We could not fetch the board details. Please try again later. If the
        problem persists, please contact{" "}
        <Link>
          <NavLink to="/support">support</NavLink>
        </Link>
        .
      </Alert>
    );
  }

  return (
    <Container>
      <BoardHeader
        board={board}
        title={board.name}
        description={board.description}
      />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  );
};
