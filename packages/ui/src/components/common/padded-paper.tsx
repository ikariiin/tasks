import { Paper } from "@mui/material";
import React from "react";

export const PaddedPaper = ({
  children,
  ...props
}: React.ComponentProps<typeof Paper>) => {
  return (
    <Paper {...props} sx={{ px: 2, py: 1 }}>
      {children}
    </Paper>
  );
};
