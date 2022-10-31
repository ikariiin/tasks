import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PrivateUserDto } from "@tasks/common";
import { AuthState } from "./index.interface";

export const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<PrivateUserDto>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
