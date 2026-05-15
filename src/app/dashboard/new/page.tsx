import { createPost } from "@/src/features/posts/actions/create-post.action";
import NewPostForm from "@/src/features/posts/components/new-post-form";
import { getCategories } from "@/src/features/posts/lib/post.queries";

export default async function WritePage() {
  const categories = await getCategories();

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <NewPostForm categories={categories} action={createPost} />
    </main>
  );
}
