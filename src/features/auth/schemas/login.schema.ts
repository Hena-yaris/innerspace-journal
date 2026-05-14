import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email").trim().toLowerCase(),

  password: z.string().min(6, "Password too short"),
});

export type LoginInput = z.infer<typeof loginSchema>;
