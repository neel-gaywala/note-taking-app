"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateNoteForm from "@/features/note/containers/update-note-form";
import { TNote } from "@/lib/types";

type UpdateNoteModalProps = {
  note: TNote | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

function UpdateNoteModal({
  note,
  isOpen,
  onOpenChange,
  onSuccess,
}: UpdateNoteModalProps) {
  if (!note) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[98%] flex-col overflow-hidden px-0 sm:max-w-3xl">
        <DialogHeader className="px-6">
          <DialogTitle>{`Update ${note.title}`}</DialogTitle>
        </DialogHeader>
        <div className="px-6">
          <UpdateNoteForm {...note} onSuccess={onSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateNoteModal;
