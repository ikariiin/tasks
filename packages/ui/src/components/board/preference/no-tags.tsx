import { Box, BoxProps } from "@mui/material";
import React from "react";
import { TagStrings } from "../../../services/strings/tags";

const Container = (props: BoxProps) => (
  <Box
    sx={{
      my: 2,
      border: "1px dashed",
      borderColor: "grey.300",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: 1,
      p: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      cursor: "pointer",
    }}
    {...props}
  />
);

export const NoTags = ({ onClick }: { onClick: () => unknown }) => {
  return <Container onClick={onClick}>{TagStrings.empty}</Container>;
};
