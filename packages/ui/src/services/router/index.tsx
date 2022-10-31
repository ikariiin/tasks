import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AuthRouter } from "./auth.router";
import { UnAuthRouter } from "./unauth.router";

export const Router = () => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth.user) {
    return <UnAuthRouter />;
  }

  return <AuthRouter />;
};
