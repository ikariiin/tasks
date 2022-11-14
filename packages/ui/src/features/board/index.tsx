import React from "react";
import { useParams } from "react-router-dom";
import { useGetBoardQuery } from "../../services/api/board";

export const Board = () => {
  const { id } = useParams<{ id: string }>();
  const { data: board, isLoading, error } = useGetBoardQuery(id || "");

  return (
    <pre>
      {JSON.stringify(
        {
          board,
          isLoading,
          error,
        },
        null,
        2,
      )}
    </pre>
  );
};
