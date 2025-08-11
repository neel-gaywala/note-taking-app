import React from "react";
import { getFetchNotes } from "@/features/note/api";
import FavoriteList from "@/features/note/containers/favorite-list";
import NoteFilter from "@/features/note/containers/note-filter";
import NoteList from "@/features/note/containers/note-list";

import { TNote } from "@/lib/types";

export default async function Note() {
  const initialNotes: TNote[] = await getFetchNotes();
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 min-h-screen w-full space-y-6 sm:space-y-10">
      <NoteFilter />
      <FavoriteList initialNotes={initialNotes} />
      <NoteList initialNotes={initialNotes} />
    </section>
  );
}
