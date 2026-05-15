"use server";


import { connectDB } from "@/src/lib/mongodb";
import { Post } from "@/src/models/post.model";

export async function deletePostAction(id: string) {
  try {
    await connectDB();

    await Post.findByIdAndDelete(id);

    return { success: true };
  } catch (err) {
    return { success: false };
  }
}
