"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { connectDB } from "@/src/lib/mongodb";
import { User } from "@/src/models/user.model";

import { getSessionId } from "../lib/get-session-id";

type UpdateEmailData = {
  newEmail: string;
  secretKey: string;
};

export async function updateEmail(data: UpdateEmailData) {
  await connectDB();

  const userId = await getSessionId();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const user = await User.findById(userId).select("+secretKey");

  if (!user) {
    throw new Error("User not found");
  }

  const isSecretValid = await bcrypt.compare(data.secretKey, user.secretKey);

  if (!isSecretValid) {
    throw new Error("The Master Key does not match our records.");
  }

  await User.findByIdAndUpdate(userId, {
    email: data.newEmail,
  });

  const cookieStore = await cookies();

  cookieStore.delete("token");

  redirect("/login?message=Email updated successfully.");
}
