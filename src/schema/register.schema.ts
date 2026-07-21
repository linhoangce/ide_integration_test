// src/schemas/register.schema.ts

import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;