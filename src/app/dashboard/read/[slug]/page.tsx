import { notFound } from "next/navigation";

import SinglePost from "@/src/features/posts/components/single-post";
import { renderPostContent } from "@/src/features/posts/editor/post-renderer";
import { getPostBySlug } from "@/src/features/posts/lib/post.queries";

export default async function ReadingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const postDoc = await getPostBySlug(slug);

  if (!postDoc) {
    notFound();
  }

  const post = JSON.parse(JSON.stringify(postDoc));

  const html = renderPostContent(post.content);

  return <SinglePost post={post} html={html} />;
}
