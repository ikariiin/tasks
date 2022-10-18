import { styled } from "@mui/material";
import React from "react";

const DividerElement = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: theme.spacing(2, 0),

  "&::before, &::after": {
    content: '""',
    flex: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  "&::before": {
    marginRight: theme.spacing(1),
  },

  "&::after": {
    marginLeft: theme.spacing(1),
  },
}));

export const Divider = ({ children }: { children: React.ReactNode }) => {
  return <DividerElement>{children}</DividerElement>;
};
