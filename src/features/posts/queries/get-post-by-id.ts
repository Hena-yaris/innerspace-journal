import { connectDB } from "@/src/lib/mongodb";
import { Post } from "@/src/models/post.model";

export async function getPostById(id: string) {
  await connectDB();

  const rawPost = await Post.findById(id).lean();

  if (!rawPost) return null;

  return JSON.parse(JSON.stringify(rawPost));
}
