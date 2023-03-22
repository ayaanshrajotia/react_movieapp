import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
