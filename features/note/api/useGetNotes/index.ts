"use client";

import { useQuery } from "@tanstack/react-query";

import { get } from "@/services/helper";
import { NOTE_URL } from "@/services/urls";
import { TNote } from "@/lib/types";

type Props = {
  initialNotes?: TNote[];
};

export function useGetNotes({ initialNotes }: Props) {
  const getNotesApi = () => get(NOTE_URL, {});
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotesApi,
    initialData: initialNotes,
  });
}
