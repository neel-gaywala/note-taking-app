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
import UpdateNoteForm from "@/features/note/containers/update-note-form";
import { CreateNoteSchemaType } from "@/lib/types";

type UpdateNoteProps = {
  id: string;
} & CreateNoteSchemaType;

export default function UpdateNote(props: UpdateNoteProps) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const openModal = () => {
    setShowUpdateModal(true);
  };

  const closeModal = () => {
    setShowUpdateModal(false);
  };

  return <div className="w-full"></div>;
}
