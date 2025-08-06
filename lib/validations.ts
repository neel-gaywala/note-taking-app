/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const errorResponseSchema = z.object({
  success: z.literal(false),
  display: z.boolean(),
  status: z.literal("Bad Request"),
  error_message: z.string(),
});

export const successResponseSchema = z.object({
  success: z.literal(true),
  display: z.boolean(),
  status: z.literal("Request processed successfully"),
  message: z.string(),
});

export const apiSchema = <T extends z.ZodObject<any> | z.ZodArray<any>>(
  schema: T
) =>
  z.object({
    ...successResponseSchema.shape,
    details: schema,
  });

/**
 * this schema is used to validate the structure of a note object
 * it includes fields like id, title, content, createdAt, and updatedAt
 */

export const noteSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createNoteSchema = z
  .object({
    title: z
      .string({
        invalid_type_error: "Title must be a string",
        required_error: "Title is required",
      })
      .min(3, "Title must be at least 3 characters"),
    content: z
      .string({
        invalid_type_error: "Content must be a string",
        required_error: "Content is required",
      })
      .min(3, "Content must be at least 3 characters")
      .max(500, "Content must be at most 500 characters"),
  })
  .strict();
