"use client";

import { useMutation } from "@tanstack/react-query";
import { remove } from "@/services/helper";
import { NOTE_URL } from "@/services/urls";

type Props = {
  id: string;
};

export function useDeleteNote({ id }: Props) {
  const DELETE_URL = `${NOTE_URL}/${id}`;
  const deleteNoteById = () => remove(DELETE_URL, {});

  return useMutation({
    mutationFn: deleteNoteById,
  });
}
