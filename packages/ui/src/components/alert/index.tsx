import { AlertProps, Alert as MuiAlert } from "@mui/material";
import React from "react";

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
  },
);
