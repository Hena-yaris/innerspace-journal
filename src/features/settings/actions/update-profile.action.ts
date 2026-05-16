"use server";

import { connectDB } from "@/src/lib/mongodb";
import { User } from "@/src/models/user.model";
import { serialize } from "@/src/utils/serialize";
import { getSessionId } from "../lib/get-session-id";

type UpdateProfileData = {
  name?: string;
  bio?: string;
  image?: string;
};

export async function updateProfile(data: UpdateProfileData) {
  await connectDB();

  const userId = await getSessionId();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const user = await User.findByIdAndUpdate(userId, data, {
    returnDocument: "after",
  });

  return serialize(user);
}
