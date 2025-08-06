import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppSliceStateProps } from "../interfaces";

const initialState: AppSliceStateProps = {
  language: "ta",
};

const AppSlice = createSlice({
  name: "APP_REDUCER",
  initialState,
  reducers: {
    setLanguage: (
      state: AppSliceStateProps,
      action: PayloadAction<"ta" | "en">
    ) => {
      state.language = action.payload;
    },
  },
});

export const APP_REDUCER = AppSlice.reducer;
export const { setLanguage } = AppSlice.actions;
