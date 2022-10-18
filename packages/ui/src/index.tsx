import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/variable.css";
import { Root } from "./features/root";

function start(): void {
  const container = document.getElementById("root");
  if (!container) {
    throw new Error("Could not find root element");
  }
  const content = <Root />;

  createRoot(container).render(content);
}

start();
