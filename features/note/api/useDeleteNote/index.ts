"use client";

import { useMutation } from "@tanstack/react-query";
import { remove } from "@/services/helper";
import { NOTE_URL } from "@/services/urls";

export function useDeleteNote() {
  const deleteNoteById = (id: number) => remove(`${NOTE_URL}/${id}`, {});
  return useMutation({
    mutationFn: deleteNoteById,
  });
}
