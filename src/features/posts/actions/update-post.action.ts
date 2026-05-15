"use server";

import { connectDB } from "@/src/lib/mongodb";
import { Post } from "@/src/models/post.model";
import { redirect } from "next/navigation";

export async function updatePostAction(formData: FormData) {
  await connectDB();

  const id = formData.get("postId");

  if (!id) {
    throw new Error("Post ID is required");
  }

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const contentRaw = formData.get("content") as string;
  const isDraft = formData.get("isDraft") === "true";

  let content = {};

  if (contentRaw && contentRaw !== '""') {
    content = JSON.parse(contentRaw);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      title,
      category,
      content,
      isDraft,
    },
    {
      returnDocument: "after",
    },
  );

  if (!updatedPost) {
    redirect("/dashboard");
  }

  redirect(`/dashboard/read/${updatedPost.slug}`);
}
