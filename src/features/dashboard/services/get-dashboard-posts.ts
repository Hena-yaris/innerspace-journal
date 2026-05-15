import { Post } from "@/src/models/post.model";
import { connectDB } from "@/src/lib/mongodb";

type DashboardSearchParams = {
  title?: string;
  category?: string;
  draft?: string;
};

export async function getDashboardPosts(params: DashboardSearchParams) {
  await connectDB();

  const { title, category, draft } = params;

  let activeFilter = "All";

  const filter: any = {};

  if (draft === "true") {
    filter.isDraft = true;
    activeFilter = "Drafts";
  } else if (category && category !== "All") {
    filter.category = category;
    activeFilter = category;
  } else if (title && title.trim() !== "") {
    filter.title = {
      $regex: new RegExp(title, "i"),
    };
  }

  const [posts, categories] = await Promise.all([
    Post.find(filter).sort({
      createdAt: -1,
    }),

    Post.distinct("category"),
  ]);

  return {
    posts: JSON.parse(JSON.stringify(posts)),

    categories: ["All", "Drafts", ...categories],

    activeFilter,
  };
}
