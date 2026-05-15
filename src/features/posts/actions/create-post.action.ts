"use server";

import { redirect } from "next/navigation";

import { connectDB } from "@/src/lib/mongodb";
import { Post } from "@/src/models/post.model";

import { generateSlug } from "../lib/post.utils";

export async function createPost(formData: FormData) {
  await connectDB();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const contentRaw = formData.get("content") as string;
  const isDraft = formData.get("isDraft") === "true";

  let content = {};

  if (contentRaw && contentRaw !== '""') {
    content = JSON.parse(contentRaw);
  }

  const slug = generateSlug(title);

  await Post.create({
    title,
    slug,
    category,
    content,
    isDraft,
  });

  redirect(`/dashboard/read/${slug}`);
}
