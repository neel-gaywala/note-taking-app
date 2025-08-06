import type {
  errorResponseSchema,
  noteSchema,
  createNoteSchema,
} from "@/lib/validations";
import { z } from "zod";

export type ApiError = z.infer<typeof errorResponseSchema>;

export type TNote = z.infer<typeof noteSchema>;
export type CreateNoteSchemaType = z.infer<typeof createNoteSchema>;
