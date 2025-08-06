import { getFetchNotes } from "@/features/note/api";
import { TNote } from "@/lib/types";
import CreateNote from "@/features/note/containers/create-note";
import NoteList from "@/features/note/containers/note-list";

export default async function Note() {
  const initialNotes: TNote[] = await getFetchNotes();
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 min-h-screen w-full space-y-8">
      <CreateNote />
      <NoteList initialNotes={initialNotes} />
    </section>
  );
}
