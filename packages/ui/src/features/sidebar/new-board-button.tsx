import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { RiAddLine } from "react-icons/ri";

export const NewBoardButton = (props: ButtonProps) => {
  return (
    <Button
      startIcon={<RiAddLine />}
      variant="contained"
      color="primary"
      size="small"
      {...props}
    >
      New Board
    </Button>
  );
};
