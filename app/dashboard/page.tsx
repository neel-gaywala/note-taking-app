import { getFetchNotes } from "@/features/note/api";
import { TNote } from "@/lib/types";

import NoteDashboard from "@/features/note/containers/note-dashboard";

export default async function Note() {
  const notes: TNote[] = await getFetchNotes();

  return (
    <section className="sm:max-w-7xl sm:mx-auto sm:px-4 sm:py-8 p-3 min-h-screen w-full space-y-6 sm:space-y-10">
      <NoteDashboard notesData={notes} />
    </section>
  );
}
