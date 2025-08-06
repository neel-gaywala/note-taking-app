"use client";

import React, { useState } from "react";
import { TNote } from "@/lib/types";
import NoteItem from "@/features/note/components/note-item";
import { useGetNotes } from "@/features/note/api";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateNoteForm from "@/features/note/containers/update-note-form";

type NoteListProps = {
  initialNotes: TNote[];
};

function NoteList({ initialNotes }: NoteListProps) {
  const [selectedNote, setSelectedNote] = useState<TNote | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { data, error, isError } = useGetNotes({
    initialNotes,
  });

  if (isError) {
    return <span>{error.message}</span>;
  }

  if (!data) {
    return null;
  }

  const notes = data || (initialNotes as TNote[]);

  const onEditHandler = (note: TNote) => {
    setSelectedNote(note);
    setShowUpdateModal(true);
  };

  return (
    <>
      <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
        {notes.map((note: TNote) => (
          <NoteItem key={note.id} {...note} onEdit={onEditHandler} />
        ))}
      </ul>
      {selectedNote && (
        <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
          <DialogContent className="flex max-h-[98%] flex-col overflow-hidden px-0 sm:max-w-3xl">
            <DialogHeader className="px-6">
              <DialogTitle>Create Note</DialogTitle>
              <DialogDescription>
                Create a new note by filling out the form below.
              </DialogDescription>
            </DialogHeader>
            <div className="px-6">
              <UpdateNoteForm
                {...selectedNote}
                onSuccess={() => {
                  setShowUpdateModal(false);
                  setSelectedNote(null);
                }}
                onError={() => {}}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default NoteList;
