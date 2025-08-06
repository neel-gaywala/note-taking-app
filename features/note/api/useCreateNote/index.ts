"use client";

import { useMutation } from "@tanstack/react-query";

import { CreateNoteSchemaType } from "@/lib/types";

import { post } from "@/services/helper";
import { NOTE_URL } from "@/services/urls";

export function useCreateNote() {
  const proceedNoteApi = (params: CreateNoteSchemaType) =>
    post(NOTE_URL, params, {});

  return useMutation({
    mutationFn: proceedNoteApi,
  });
}
