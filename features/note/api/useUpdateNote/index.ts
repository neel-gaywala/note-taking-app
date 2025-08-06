"use client";

import { useMutation } from "@tanstack/react-query";

import { CreateNoteSchemaType } from "@/lib/types";
import { put } from "@/services/helper";
import { NOTE_URL } from "@/services/urls";

type UpdateNoteParams = CreateNoteSchemaType & { id: number };

export function useUpdateNote() {
  const proceedPutNoteApi = async (params: UpdateNoteParams) => {
    const { id, ...body } = params;
    const url = `${NOTE_URL}/${id}`;
    const response = await put(url, body, {});
    return response;
  };

  return useMutation({
    mutationFn: proceedPutNoteApi,
  });
}
