import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PublicUserDto } from "@tasks/common";
import { AuthState } from "./index.interface";

export const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<PublicUserDto>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
