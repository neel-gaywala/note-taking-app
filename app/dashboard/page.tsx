import React from "react";

import { NotFound } from "@/components/shared/not-found";
import { getFetchNotes } from "@/features/note/api";
import NoteDashboard from "@/features/note/containers/note-dashboard";
import { TNote } from "@/lib/types";

export default async function Note() {
  let notes: TNote[] = [];

  try {
    notes = await getFetchNotes();
  } catch {}

  const hasNotes = Array.isArray(notes) && notes.length > 0;

  return (
    <section className="sm:max-w-7xl sm:mx-auto sm:px-4 sm:py-8 p-3 min-h-screen w-full space-y-6 sm:space-y-10">
      {hasNotes ? <NoteDashboard notesData={notes} /> : <NotFound />}
    </section>
  );
}
