import type { errorResponseSchema } from "@/lib/validations";
import { z } from "zod";

export type ApiError = z.infer<typeof errorResponseSchema>;
