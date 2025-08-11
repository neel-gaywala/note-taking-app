import { z } from "zod";
import type {
  errorResponseSchema,
  noteSchema,
  createNoteSchema,
} from "@/lib/validations";

export type ApiError = z.infer<typeof errorResponseSchema>;

export type TNote = z.infer<typeof noteSchema>;
export type CreateNoteSchemaType = z.infer<typeof createNoteSchema>;

export type Item = {
  id: string;
  value: string;
  item: string;
};
export type TSortFilter = Item[];
