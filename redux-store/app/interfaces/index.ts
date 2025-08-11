import { TNote } from "@/lib/types";

export type TFilter = {
  search: string;
  sort: string;
  date: string;
};

export interface AppSliceStateProps {
  language: "ta" | "en";
  filterBy: TFilter;
  favoriteNotes: TNote[];
}
