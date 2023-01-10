import { BoardDto } from "@tasks/common";
import React from "react";

export interface IBoardContext {
  board: BoardDto | null;
  boardId: string | null;
}

export const defaultBoardContext: IBoardContext = {
  board: null,
  boardId: null,
};

export const BoardContext =
  React.createContext<IBoardContext>(defaultBoardContext);
