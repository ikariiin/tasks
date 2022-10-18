import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import React from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

export const PasswordVisibilityToggle = ({
  current,
  change,
}: {
  current: boolean;
  change: (value: boolean) => unknown;
}) => {
  return (
    <InputAdornment position="end">
      <Tooltip title="Toggle password visibility">
        <IconButton>
          {current ? (
            <RiEyeCloseLine onClick={() => change(!current)} />
          ) : (
            <RiEyeLine onClick={() => change(!current)} />
          )}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
};
