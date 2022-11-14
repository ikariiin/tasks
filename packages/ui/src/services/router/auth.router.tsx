import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazyImportModule, ModuleType } from "../import";

const Dashboard = lazyImportModule(ModuleType.Feature, "dashboard");
const Container = lazyImportModule(ModuleType.Feature, "container");
const Board = lazyImportModule(ModuleType.Feature, "board");

export const AuthRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Container />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/board/:id",
          element: <Board />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
