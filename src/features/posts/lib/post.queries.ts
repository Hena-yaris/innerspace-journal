import { connectDB } from "@/src/lib/mongodb";
import { Post } from "@/src/models/post.model";

export async function getCategories() {
  await connectDB();

  const categories = await Post.distinct("category");

  return categories || [];
}
