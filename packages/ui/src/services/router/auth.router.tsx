import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazyImportModule, ModuleType } from "../import";

const Dashboard = lazyImportModule(ModuleType.Feature, "dashboard");

export const AuthRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
