import { Box, InputAdornment, styled, TextField } from "@mui/material";
import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { Boards } from "./boards";
import { NavBar } from "./nav-bar";
import { NewBoardButton } from "./new-board-button";

const Aside = styled(Box)(({ theme }) => ({
  height: "100%",
  padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
}));

export const Sidebar = () => {
  return (
    <Aside>
      <NavBar />
      <TextField
        placeholder="Search"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiSearchLine />
            </InputAdornment>
          ),
        }}
      />
      <Boards />
      <NewBoardButton
        sx={{
          margin: "0 16px",
          marginTop: "auto",
        }}
      />
    </Aside>
  );
};
