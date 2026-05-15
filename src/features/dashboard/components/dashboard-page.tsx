import { getDashboardPosts } from "../services/get-dashboard-posts";

import DashboardHeader from "./dashboard-header";
import DashboardGreeting from "./dashboard-greeting";
import DashboardSearch from "./dashboard-search";
import DashboardFilterRow from "./dashboard-filter-row";
import DashboardFloatingButton from "./dashboard-floating-button";

import PostList from "@/src/features/posts/components/post-list";

type Props = {
  searchParams: {
    title?: string;
    category?: string;
    draft?: string;
  };
};

export async function DashboardPageView({ searchParams }: Props) {
  const { posts, categories, activeFilter } =
    await getDashboardPosts(searchParams);

    

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <DashboardHeader />

      <DashboardGreeting />

      <DashboardSearch currentTitle={searchParams.title} />

      <DashboardFilterRow activeFilter={activeFilter} categories={categories} />

      <PostList posts={posts} />

      <DashboardFloatingButton />
    </main>
  );
}
