import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Note, CreateNoteRequest, UpdateNoteRequest } from "@/types";

const API_BASE_URL = "/api/notes";

const notesApi = {
  getAll: async (): Promise<Note[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    return response.json();
  },

  getById: async (id: number): Promise<Note> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch note");
    }
    return response.json();
  },

  create: async (data: CreateNoteRequest): Promise<Note> => {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create note");
    }
    return response.json();
  },

  update: async (id: number, data: UpdateNoteRequest): Promise<Note> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update note");
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
  },
};

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: notesApi.getAll,
  });
};

export const useNote = (id: number) => {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: () => notesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNoteRequest }) =>
      notesApi.update(id, data),
    onSuccess: (updatedNote) => {
      queryClient.setQueryData(["notes", updatedNote.id], updatedNote);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesApi.delete,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ["notes", deletedId] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
