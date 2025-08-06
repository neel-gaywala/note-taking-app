import React from "react";

import { Back } from "@/components/shared/back";
import { getFetchNotes } from "@/features/note/api";
import NoteDashboard from "@/features/note/containers/note-dashboard";
import { TNote } from "@/lib/types";

export default async function Note() {
  const notes: TNote[] = await getFetchNotes();

  return (
    <section className="sm:max-w-7xl sm:mx-auto sm:px-4 sm:py-8 p-3 min-h-screen w-full space-y-6 sm:space-y-10">
      <div className="flex">
        <Back>
          <h1 className="text-3xl font-bold">{"Dashboard"}</h1>
        </Back>
      </div>
      <NoteDashboard notesData={notes} />
    </section>
  );
}
