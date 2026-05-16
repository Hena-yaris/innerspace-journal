"use server";

import { connectDB } from "@/src/lib/mongodb";
import { User } from "@/src/models/user.model";
import { getSessionId } from "../lib/get-session-id";

export async function getAuthenticatedUser() {
  const userId = await getSessionId();

  if (!userId) return null;

  await connectDB();

  return await User.findById(userId).lean();
}
