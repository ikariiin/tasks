import { styled, Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { lazyImportModule, ModuleType } from "../../services/import";

const Sidebar = lazyImportModule(ModuleType.Feature, "sidebar");

const ContainerElement = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(200px, 11vw) auto",
  gap: theme.spacing(2),
  height: "100vh",
}));

export const Container = () => {
  return (
    <ContainerElement>
      <Sidebar />
      <Outlet />
    </ContainerElement>
  );
};
