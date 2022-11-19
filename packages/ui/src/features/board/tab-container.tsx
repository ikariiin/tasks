import { Box, Button, styled } from "@mui/material";
import React from "react";
import { RiMessage3Line, RiSettings4Line, RiTaskLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  "& > *": {
    margin: theme.spacing(1),
    "&:first-of-type": {
      marginLeft: 0,
    },
  },
}));

export const TabContainer = ({ boardId }: { boardId: string }) => {
  const location = useLocation();

  return (
    <Container>
      <NavLink to={`/board/${boardId}`}>
        <Button
          variant={
            location.pathname === `/board/${boardId}` ? "contained" : "outlined"
          }
          color="secondary"
          size="small"
          startIcon={<RiTaskLine />}
        >
          Tasks
        </Button>
      </NavLink>
      <NavLink to={`/board/${boardId}/discussion`}>
        <Button
          variant={
            location.pathname === `/board/${boardId}/discussion`
              ? "contained"
              : "outlined"
          }
          color="secondary"
          size="small"
          startIcon={<RiMessage3Line />}
        >
          Discussion
        </Button>
      </NavLink>
      <NavLink to={`/board/${boardId}/preferences`}>
        <Button
          variant={
            location.pathname === `/board/${boardId}/preferences`
              ? "contained"
              : "outlined"
          }
          color="secondary"
          size="small"
          startIcon={<RiSettings4Line />}
        >
          Preferences
        </Button>
      </NavLink>
    </Container>
  );
};
