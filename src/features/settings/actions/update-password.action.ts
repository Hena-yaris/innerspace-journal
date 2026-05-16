"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { connectDB } from "@/src/lib/mongodb";
import { User } from "@/src/models/user.model";

import { getSessionId } from "../lib/get-session-id";

export async function updatePassword(
  currentPassword: string,
  newPassword: string,
  secretKey: string,
) {
  await connectDB();

  const userId = await getSessionId();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const user = await User.findById(userId)
    .select("+password +secretKey");

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!isMatch) {
    throw new Error("Current password incorrect");
  }

  if (!user.secretKey) {
    throw new Error("Secret key not set");
  }

  const isSecretValid = await bcrypt.compare(
    secretKey,
    user.secretKey,
  );

  if (!isSecretValid) {
    throw new Error(
      "The Master Key does not match our records.",
    );
  }

  const hashed = await bcrypt.hash(
    newPassword,
    10,
  );

  user.password = hashed;

  await user.save();

  const cookieStore = await cookies();

  cookieStore.delete("token");

  redirect(
    "/login?message=Password changed. Please log in again.",
  );
}