import { AppSliceStateProps } from "@/redux-store/app/interfaces";
import { TNote } from "../types";

export const MOCK_NOTE_DATA: TNote[] = [
  {
    id: 1,
    title: "Favorite Note 1",
    content: "About stripes",
    updatedAt: "2025-08-12T10:00:00Z",
    createdAt: "2025-08-12T10:00:00Z",
  },
  {
    id: 2,
    title: "Favorite Note 2",
    content: "About fruit",
    updatedAt: "2025-08-10T10:00:00Z",
    createdAt: "2025-08-10T10:00:00Z",
  },
  {
    id: 3,
    title: "Favorite Note 3",
    content: "Is awesome",
    updatedAt: "2025-01-01T10:00:00Z",
    createdAt: "2025-01-01T10:00:00Z",
  },
];

export const MOCK_FAV_DATA = [MOCK_NOTE_DATA[0], MOCK_NOTE_DATA[2]];

export const mockDefaultAppState: AppSliceStateProps = {
  language: "en",
  favoriteNotes: [],
  filterBy: { search: "", sort: "newest", date: "all" },
};
