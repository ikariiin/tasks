import { createSlice } from "@reduxjs/toolkit";
import { TeamState } from "./index.interface";

export const initialState: TeamState = {
  teams: [],
  activeTeam: null,
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    setActiveTeam: (state, action) => {
      state.activeTeam = action.payload;
    },
  },
});
