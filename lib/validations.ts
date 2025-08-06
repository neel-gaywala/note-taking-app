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
