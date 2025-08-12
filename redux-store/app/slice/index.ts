import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TNote } from "@/lib/types";
import { AppSliceStateProps, TFilter } from "../interfaces";
export const initialState: AppSliceStateProps = {
  language: "ta",
  filterBy: {
    search: "",
    sort: "newest",
    date: "today",
  },
  favoriteNotes: [],
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
    setFilterBy: (
      state: AppSliceStateProps,
      action: PayloadAction<TFilter>
    ) => {
      state.filterBy = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<TNote>) => {
      const exists = state.favoriteNotes?.some(
        (note) => note.id === action.payload.id
      );

      if (exists) {
        state.favoriteNotes = state.favoriteNotes?.filter(
          (note) => note.id !== action.payload.id
        );
      } else {
        state.favoriteNotes = [...(state.favoriteNotes || []), action.payload];
      }
    },
  },
});

export const APP_REDUCER = AppSlice.reducer;
export const { setLanguage, setFilterBy, toggleFavorite } = AppSlice.actions;
