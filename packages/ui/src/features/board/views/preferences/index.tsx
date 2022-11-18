import { Alert, AlertTitle, Grid, Link } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { TagEditor } from "../../../../components/board/preference/tag-editor";
import { useGetBoardQuery } from "../../../../services/api/board";

export const Preferences = () => {
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
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TagEditor boardId={board.id} tags={board.tags} />
      </Grid>
    </Grid>
  );
};
