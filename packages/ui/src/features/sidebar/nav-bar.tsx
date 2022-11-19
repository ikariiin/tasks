import { IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";
import { RiHome4Line, RiSettings3Line, RiUser3Line } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation();

  return (
    <Stack direction="column" spacing={1} sx={{ mb: 2 }}>
      {/* <Typography variant="subtitle2">Quick Nav</Typography> */}
      <Stack direction="row" spacing={2} justifyContent="center">
        <NavLink to={`/`}>
          <Tooltip title="Home">
            <IconButton
              color={location.pathname === "/" ? "primary" : "default"}
            >
              <RiHome4Line />
            </IconButton>
          </Tooltip>
        </NavLink>
        <NavLink to={`/profile`}>
          <Tooltip title="Home">
            <IconButton
              color={location.pathname === "/profile" ? "primary" : "default"}
            >
              <RiUser3Line />
            </IconButton>
          </Tooltip>
        </NavLink>
        <NavLink to={`/preferences`}>
          <Tooltip title="Home">
            <IconButton
              color={
                location.pathname === "/preferences" ? "primary" : "default"
              }
            >
              <RiSettings3Line />
            </IconButton>
          </Tooltip>
        </NavLink>
      </Stack>
    </Stack>
  );
};
