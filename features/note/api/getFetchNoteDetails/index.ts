import { TNote } from "@/lib/types";
import { getFetch } from "@/services/helper";

import { NOTE_URL } from "@/services/urls";

export async function getFetchNoteDetails(id: string): Promise<TNote> {
  const res = await getFetch(`${NOTE_URL}/${id}`);

  if (!res.success) {
    throw new Error("Failed to fetch posts");
  }
  return res.data as TNote;
}
