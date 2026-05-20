import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
  /** Honeypot — bots only; must be empty. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
