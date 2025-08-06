import { getFetchNotes } from "@/features/note/api";
import { TNote } from "@/lib/types";
import CreateNote from "@/features/note/containers/create-note";
import NoteList from "@/features/note/containers/note-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Note() {
  const initialNotes: TNote[] = await getFetchNotes();
  console.log(initialNotes);
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 min-h-screen w-full space-y-6 sm:space-y-10">
      <div className="flex  items-center justify-between">
        <h1 className="text-3xl font-bold">Notes</h1>
        <div className="flex space-x-2">
          <Button asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
          <CreateNote />
        </div>
      </div>
      <NoteList initialNotes={initialNotes} />
    </section>
  );
}
