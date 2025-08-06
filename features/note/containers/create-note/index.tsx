"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateNoteForm from "@/features/note/containers/create-note-form";

export default function CreateNote() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const openModal = () => {
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <Button className="cursor-pointer" onClick={openModal}>
          Create Note
        </Button>
      </div>

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="flex max-h-[98%] flex-col overflow-hidden px-0 sm:max-w-3xl">
          <DialogHeader className="px-6">
            <DialogTitle>Create Note</DialogTitle>
            <DialogDescription>
              Create a new note by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <div className="px-6">
            <CreateNoteForm onSuccess={closeModal} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
