import { DashboardPageView } from "@/src/features/dashboard/components/dashboard-page";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    title?: string;
    category?: string;
    draft?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <DashboardPageView
      searchParams={params}
    />
  );
}