import { Box } from "@mui/material";
import { BoxProps } from "@mui/system";
import React from "react";

const Container = (props: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
    }}
    {...props}
  />
);

export const ActionButtonContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Container>{children}</Container>;
};
