"use client";

import React, { useMemo, useState } from "react";
import { NotFound } from "@/components/shared/not-found";
import { toast } from "@/components/ui/sonner";
import { useGetNotes, useDeleteNote } from "@/features/note/api";
import DeleteNoteDialog from "@/features/note/components/delete-note-dialog";
import NoteItem from "@/features/note/components/note-item";
import UpdateNoteModal from "@/features/note/components/update-note-modal";

import { useRedux, useInvalidateQueries } from "@/hooks";
import { now, nowDate } from "@/lib/date-utils";
import { TNote } from "@/lib/types";

type NoteListProps = {
  initialNotes: TNote[];
};

function NoteList({ initialNotes }: NoteListProps) {
  const { data, error, isError } = useGetNotes({ initialNotes });

  const { invalidateQueries } = useInvalidateQueries();
  const { mutate: deleteNoteApi } = useDeleteNote();

  const [selectedNote, setSelectedNote] = useState<TNote | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const {
    app: { filterBy },
  } = useRedux();

  const { search, date, sort } = filterBy;

  const filteredNotes = useMemo(
    () => filterAndSortNotes(data || [], search, date, sort),
    [data, search, date, sort]
  );
  if (isError) return <span>{error.message}</span>;
  if (!data) return null;

  function filterAndSortNotes(
    notes: TNote[],
    search?: string,
    date?: string,
    sort?: string
  ): TNote[] {
    if (!notes) return [];

    const filters: Record<string, (note: TNote) => boolean> = {
      search: (note) =>
        !search ||
        [note.title, note.content].some((field) =>
          field.toLowerCase().includes(search.toLowerCase())
        ),

      date: (note) => {
        if (!date) return true;
        const created = nowDate(note.updatedAt);
        switch (date) {
          case "today":
            return created.isSame(now, "day");
          case "week":
            return created.isSameOrAfter(now.subtract(7, "day"), "day");
          case "month":
            return created.isSameOrAfter(now.subtract(1, "month"), "day");
          default:
            return true;
        }
      },
    };

    const sorters: Record<string, (a: TNote, b: TNote) => number> = {
      newest: (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      oldest: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      asc: (a, b) => a.title.localeCompare(b.title),
      desc: (a, b) => b.title.localeCompare(a.title),
    };

    let result = notes.filter(
      (note) => filters.search(note) && filters.date(note)
    );

    if (sort && sorters[sort]) {
      result = [...result].sort(sorters[sort]);
    }

    return result;
  }

  const handleEdit = (note: TNote) => {
    setSelectedNote(note);
    setShowUpdateModal(true);
  };

  const handleDelete = (note: TNote) => {
    setSelectedNote(note);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedNote) return;

    deleteNoteApi(selectedNote.id, {
      onSuccess: () => {
        invalidateQueries(["notes"]);
        setShowDeleteDialog(false);
        setSelectedNote(null);
        toast.success("Note deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete note");
      },
    });
  };

  return (
    <React.Fragment>
      <div className="relative flex flex-col space-y-4">
        <h3 className="heading">{"My Note"}</h3>
        {filteredNotes.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 items-stretch">
            {filteredNotes.map((note: TNote) => (
              <NoteItem
                key={note.id}
                {...note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        ) : (
          <NotFound />
        )}
      </div>

      <UpdateNoteModal
        note={selectedNote}
        isOpen={showUpdateModal}
        onOpenChange={setShowUpdateModal}
        onSuccess={() => {
          setShowUpdateModal(false);
          setSelectedNote(null);
        }}
      />

      <DeleteNoteDialog
        isOpen={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </React.Fragment>
  );
}

export default NoteList;
