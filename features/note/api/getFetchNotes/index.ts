import { TNote } from "@/lib/types";
import { getFetch } from "@/services/helper";

import { NOTE_URL } from "@/services/urls";

export async function getFetchNotes(): Promise<TNote[]> {
  const res = await getFetch(NOTE_URL);

  if (!res.success) {
    throw new Error("Failed to fetch posts");
  }
  return res.data as TNote[];
}
