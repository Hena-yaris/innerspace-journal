import { notFound } from "next/navigation";


import { updatePostAction } from "@/src/features/posts/actions/update-post.action";

import { getPostById } from "@/src/features/posts/queries/get-post-by-id";

import { getPostCategories } from "@/src/features/posts/queries/get-post-categories";
import NewPostForm from "@/src/features/posts/components/new-post-form";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, categories] = await Promise.all([
    getPostById(id),
    getPostCategories(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <NewPostForm categories={categories} post={post} action={updatePostAction} />
    </main>
  );
}
