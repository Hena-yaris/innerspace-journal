import { connectDB } from "@/src/lib/mongodb";
import { Post } from "@/src/models/post.model";

export async function getCategories() {
  await connectDB();

  const categories = await Post.distinct("category");

  return categories || [];
}


export async function getPostBySlug(slug: string) {
  await connectDB();

  const post = await Post.findOne({ slug }).lean();

  return post;
}