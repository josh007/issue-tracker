import { string, z } from "zod";

export const schemaIssue = z.object({
  title: z.string().min(2, "Title is required").max(255),
  description: z.string().min(2, "Description is required").max(65535),
});

export const schemaPatchIssue = z.object({
  title: z.string().min(2, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(2, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssingedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
