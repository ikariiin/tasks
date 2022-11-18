import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazyImportModule, ModuleType } from "../import";

const Dashboard = lazyImportModule(ModuleType.Feature, "dashboard");
const Container = lazyImportModule(ModuleType.Feature, "container");
const Board = lazyImportModule(ModuleType.Feature, "board");
const Tasks = lazyImportModule(ModuleType.Feature, "board/views/tasks");
const Discussion = lazyImportModule(
  ModuleType.Feature,
  "board/views/discussion",
);
const Preferences = lazyImportModule(
  ModuleType.Feature,
  "board/views/preferences",
);

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
          children: [
            {
              path: "/board/:id/",
              element: <Tasks />,
            },
            {
              path: "/board/:id/discussion",
              element: <Discussion />,
            },
            {
              path: "/board/:id/preferences",
              element: <Preferences />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
