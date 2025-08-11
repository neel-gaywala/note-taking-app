import { TNote } from "@/lib/types";
import { getFetch } from "@/services/helper";

import { NOTE_URL } from "@/services/urls";

export async function getFetchNoteDetails(id: string): Promise<TNote | null> {
  const res = await getFetch(`${NOTE_URL}/${id}`);
  if (!res.success) {
    return null;
  }
  return res.data as TNote;
}
