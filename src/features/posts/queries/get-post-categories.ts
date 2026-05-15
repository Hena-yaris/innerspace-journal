import { connectDB } from "@/src/lib/mongodb";
import { Post } from "@/src/models/post.model";

export async function getPostCategories() {
  await connectDB();

  return (await Post.distinct("category")) || [];
}
