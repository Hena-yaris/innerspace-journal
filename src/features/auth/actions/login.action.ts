
"use server";

import { connectDB } from "@/src/lib/mongodb";

import { loginSchema } from "../schemas/login.schema";
import { loginUser } from "../services/auth.service";

type LoginActionResult =
  | {
      success: true;
      token: string;
    }
  | {
      success: false;
      error: string;
    };

export async function loginAction(data: unknown): Promise<LoginActionResult> {
  await connectDB();

  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message || "Invalid form data",
    };
  }

  try {
    const result = await loginUser(
      validated.data.email,
      validated.data.password,
    );

    return {
      success: true,
      token: result.token,
    };
  } catch {
    return {
      success: false,
      error: "Invalid credentials",
    };
  }
}