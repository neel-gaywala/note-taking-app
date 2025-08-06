"use client";

import { useState } from "react";
import { useGetNotes, useDeleteNote } from "@/features/note/api";
import NoteItem from "@/features/note/components/note-item";
import UpdateNoteForm from "@/features/note/containers/update-note-form";
import NoteFilter from "@/features/note/containers/note-filter";
import { TNote } from "@/lib/types";
import { useInvalidateQueries } from "@/hooks";
import { toast } from "@/components/ui/sonner";
import { NotFound } from "@/components/shared/not-found";
import { Placeholder } from "@/components/shared/place-holder";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type NoteListProps = {
  initialNotes: TNote[];
};

function NoteList({ initialNotes }: NoteListProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [selectedNote, setSelectedNote] = useState<TNote | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { invalidateQueries } = useInvalidateQueries();
  const { mutate: deleteNoteApi, isPending } = useDeleteNote();
  const { data, error, isError, isLoading } = useGetNotes({ initialNotes });

  if (isError) return <span>{error.message}</span>;
  if (!data) return null;

  // Handlers
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
        // Handle delete error (optional)
        toast.error("Failed to delete note");
      },
    });
  };

  // Filtering + Sorting
  const filteredNotes = data
    .filter((note: TNote) =>
      [note.title, note.content].some((text) =>
        text.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a: TNote, b: TNote) =>
      sort === "newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return (
    <>
      {/* Filter Bar */}
      <NoteFilter
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
      />

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
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

      {/* Update Note Modal */}
      {selectedNote && (
        <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
          <DialogContent className="flex max-h-[98%] flex-col overflow-hidden px-0 sm:max-w-3xl">
            <DialogHeader className="px-6">
              <DialogTitle>Update {selectedNote.title}</DialogTitle>
            </DialogHeader>
            <div className="px-6">
              <UpdateNoteForm
                {...selectedNote}
                onSuccess={() => {
                  setShowUpdateModal(false);
                  setSelectedNote(null);
                }}
                onError={() => {
                  // Optional: Handle update error
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this note? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default NoteList;
